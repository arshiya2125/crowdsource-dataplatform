const getSentencesForProfanityCheck = `update dataset_row set profanity_checked_by = $1,profanity_checked_at = $2 ,assigned_for_profanity_check = true where \
dataset_row_id in (select dataset_row_id from dataset_row where assigned_for_profanity_check = false and type = $3 and LOWER(media->>'language') = LOWER($4) and (profanity_checked_by is null or profanity_checked_by != $1) limit 20) returning dataset_row_id,dataset_row.media->>'data' as media`

const getSentencesForProfanityCheckForCorrection = `update dataset_row set correction_user = $1 , assigned_correction = true where \
dataset_row_id in (select dataset_row_id from dataset_row where assigned_correction = false and type = $3 and LOWER(media->>'language') = LOWER($4) and correction_user != $1 and correction is true limit 20) returning dataset_row_id,dataset_row.media->>'data' as media`;

const updateSentenceWithProfanity = `update dataset_row set is_profane = $1, profanity_checked_at = $4 where dataset_row_id = $2 and profanity_checked_by = $3`;

const updateSentenceWithProfanityForCorrection = `update dataset_row set is_profane = $1, correction = false where dataset_row_id = $2 and correction_user = $3`;

const releaseMediaQuery = `update dataset_row set assigned_for_profanity_check = false where dataset_row_id = $1`

const releaseMediaQueryForCorrection =  `update dataset_row set assigned_correction = false where dataset_row_id = $1`;

module.exports = 
{
    getSentencesForProfanityCheck,
    updateSentenceWithProfanity,
    releaseMediaQuery,
    getSentencesForProfanityCheckForCorrection,
    updateSentenceWithProfanityForCorrection,
    releaseMediaQueryForCorrection
}