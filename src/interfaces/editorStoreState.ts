import type ICVFormData from "@/interfaces/cvFormData.ts";

export default interface IEditorStoreState {
  currentSection: TEditorSection
  formData: ICVFormData
}
