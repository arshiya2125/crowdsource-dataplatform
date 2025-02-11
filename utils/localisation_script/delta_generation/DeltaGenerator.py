#!/usr/bin/env python
# coding: utf-8

# # Generate Delta Excel Files using JSON as input.

# In[1]:


import pandas as pd
import openpyxl
import json
import re
import os
import argparse
from datetime import datetime
import json
from ParseHtmlAndGetKeys import get_keys_with_path


# In[2]:


def move_column(dataframe, column_name, index):
    popped_column = dataframe.pop(column_name)
    dataframe.insert(index, column_name, popped_column)


# In[3]:


def read_json(json_file_path):
    with open(json_file_path) as f:
        data = json.load(f)
    return data


# In[4]:


def load_en_key_values(input_base_path):
    language_code = 'en'
    input_json_path = '{base_path}/{language}.json'.format(base_path=input_base_path, language=language_code)
    json_data = read_json(input_json_path)
    return json_data


# In[5]:


def get_dict_for_data(key, processed_text, replacement_mapping_dict, keys_with_path_map):
    out_dict = {}
    out_dict["Key"] = key
    out_dict["English copy"] = [processed_text]
    path = ""
    if key in keys_with_path_map:
        path = keys_with_path_map[key]
    out_dict["Url path"] = [path]
    for replacement in sorted (replacement_mapping_dict.keys()):
        out_dict[replacement] = [replacement_mapping_dict[replacement]]
    return out_dict


# In[6]:


def get_text_from_html_tag(tag):
    text_extraction_regex = r"<(\S*?)[^>]*>(.*?)<\/\1>"
    out_tag = tag
    matches = re.finditer(text_extraction_regex, out_tag, re.MULTILINE)
    string_matches = set()
    for match in matches:
        match_group_length = len(match.groups())
        if match_group_length>1 and len(match.group(2)) != 0:
            string_matches.add(match.group(2).strip())
    return string_matches


# In[7]:


def extract_and_replace_tags(text, allowed_replacements):
    tag_identification_regex = r"<(\S*?)[^>]*>.*?<\/\1>|<.*?\/>"
    out_txt = text
    print('*****', out_txt)
    matched_tags = re.finditer(tag_identification_regex, out_txt, re.MULTILINE)
    replacement_identifier_index = 0
    replacement_mapping_dict = {}
    for match in matched_tags:
        matched_tag = match.group()
        if "<b>" in matched_tag:
            continue
        elif "<a" in matched_tag:
            attributes_part_string = matched_tag[matched_tag.find('<a')+2: matched_tag.find('>')]
            replacement_mapping_dict['a-tag-replacement'] = attributes_part_string
            matched_tag_replacement = matched_tag.replace(attributes_part_string,"")
            out_txt = out_txt.replace(matched_tag, matched_tag_replacement)
        else:
            replacement = allowed_replacements[replacement_identifier_index]
            replacement_mapping_dict[replacement] = matched_tag
            replacement_identifier_index+=1
            out_txt = out_txt.replace(matched_tag, '<{}>'.format(replacement))
    return out_txt , replacement_mapping_dict


# In[8]:


def get_data_without_translation(language_name, json_data, allowed_replacements, en_data, all_keys, keys_with_path_map):
    language_df = pd.DataFrame([], columns=[])
    keys_list = []
    if all_keys:
        keys_list = list(json_data.keys())
    else:
        keys_list = find_keys_without_translation(json_data)
        keys_without_translation[language_name] = keys_list
        
    for key in keys_list:
        en_value = en_data[key]
        processed_text, replacement_mapping_dict = extract_and_replace_tags(en_value, allowed_replacements)
        data_dict = get_dict_for_data(key, processed_text, replacement_mapping_dict, keys_with_path_map)
        try:
            tmp_df = pd.DataFrame.from_dict(data_dict, orient='columns')
            language_df = language_df.append(tmp_df, ignore_index=True)
        except Exception as e:
            print(e, "\n", data_dict, "\n\n")
    language_df[language_name] = ""
    move_column(language_df, language_name,1)        
    return language_df


# In[9]:


def find_keys_without_translation(json_data):
    keys_without_translation = []
    for key, value in json_data.items():
        if key == value and value:
            keys_without_translation.append(key)
    return keys_without_translation


# In[10]:


def gen_delta(languages, input_base_path, meta_out_base_path, sme_out_base_path, all_keys):
    os.makedirs(meta_out_base_path, exist_ok=True)
    os.makedirs(sme_out_base_path, exist_ok=True)

    allowed_replacements = ["u","v","w","x", "y", "z"]
    en_data = load_en_key_values(input_base_path)
    keys_with_path_map = get_keys_with_path()

    for language_code, language_name in languages:
        input_json_path = '{base_path}/{language}.json'.format(base_path=input_base_path, language=language_code)
        json_data = read_json(input_json_path)

        language_df = get_data_without_translation(language_name, json_data, allowed_replacements, en_data, all_keys, keys_with_path_map)

        output_excel_path = '{base_path}/{language}.xlsx'.format(base_path=meta_out_base_path, language=language_code)
        language_df.to_excel(output_excel_path, index = False)
        output_sme_excel_path = '{base_path}/{language}.xlsx'.format(base_path=sme_out_base_path, language=language_code)
        to_smes = language_df[["English copy", language_name, "Url path"]]
        to_smes = to_smes.drop_duplicates(subset=["English copy"], keep="first")
        to_smes.to_excel(output_sme_excel_path, index = False)


# In[11]:


def export_report(report_json, report_type):
    now = datetime.now()
    report_json['last_run_timestamp'] = str(now)
    os.makedirs('reports',exist_ok=True)
    with open('{}/report_{}_{}.json'.format('reports', report_type, now), 'w') as f:
        f.write(json.dumps(report_json, indent = 4, ensure_ascii=False))


# In[12]:


def generate_report():
    report = {}
    report['keys_without_translation'] = keys_without_translation
    
    export_report(report, 'delta')


# ## MAIN CELL TO GENERATE DELTA

# In[13]:


LANGUAGES = read_json('./../languages.json')


keys_without_translation = {}
example = '''
        Example commands:
        
        For specific languages:
            python DeltaGenerator.py -i ./../all_keys_generator/out -o . -l gu pa
        
        For all languages:
            python DeltaGenerator.py -i ./../all_keys_generator/out -o . -a
    '''

parser = argparse.ArgumentParser(epilog=example,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
group = parser.add_mutually_exclusive_group(required=True)
group.add_argument("-a", "--all-languages", action="store_true", help = "Generate delta for all languages")
group.add_argument("-l", "--languages", nargs="+", help = "Generate delta for the languages mentioned by language codes(space separated)", choices=list(LANGUAGES.keys()))
parser.add_argument("-i", "--input-folder-path", required=True, help = "Input folder path with json files present")
parser.add_argument("-o", "--output-folder-path", required=True, help = "Output folder path where excels are generated")
parser.add_argument("--all-keys", action="store_true", help = "Consider all keys while generating excel")


args = parser.parse_args()
languages = {}
all_keys = args.all_keys
if args.all_languages:
    languages = LANGUAGES.copy()
else:
    language_codes = args.languages
    for code in language_codes:
        languages[code] = LANGUAGES[code]

input_base_path = args.input_folder_path
output_base_path = args.output_folder_path
        
meta_out_base_path = os.path.join(output_base_path, 'out-meta/')
sme_out_base_path = os.path.join(output_base_path, 'out-sme/')

gen_delta(languages.items(), input_base_path, meta_out_base_path, sme_out_base_path, all_keys)
generate_report()



