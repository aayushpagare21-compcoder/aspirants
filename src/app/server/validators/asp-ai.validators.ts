// TODO: Replace this with zod schema.
export function validateEvaluateAnswerAPIFormData(
  answerPDF: FormDataEntryValue | null,
  question?: string,
) {
  return answerPDF && question;
}
