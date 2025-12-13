import type IExperienceForm from "@/interfaces/experienceForm.ts";

export default interface ICVFormData {
  full_name: string
  position_title: string
  email: string
  phone: string
  location: string
  description: string

  experience_forms: Array<IExperienceForm>
}