import { defineStore } from 'pinia'
import type IEditorStoreState from "@/interfaces/editorStoreState.ts";
import type IExperienceForm from "@/interfaces/experienceForm.ts";


export const useEditorStore = defineStore('editorStore', {
  state: (): IEditorStoreState => ({
    currentSection: "personal",
    formData: {
      full_name: "Karol Milewczyk",
      position_title: "Fullstack developer",
      email: "milewczyk@gmail.com",
      phone: "+48 510 695 802",
      location: "Bytów, PL",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",

      experience_forms: [
        {
          title: "Fullstack Developer",
          company: "Monser Inc.",
          start_date: "2025-12",
          end_date: "2025-12",
          is_ongoing: true,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        },
        {
          title: "Backend Developer",
          company: "Monser Inc.",
          start_date: "2024-01",
          end_date: "2025-12",
          is_ongoing: false,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        }
      ],
    },
  }),
  actions: {
    addExperienceForm(newForm: IExperienceForm): void {
      this.formData.experience_forms.push(newForm);
    },
    setCurrentSection(sectionName: TEditorSection): void {
      this.currentSection = sectionName;
    }
  },
  getters: {
    hasContactData(state) {
      return state.formData.email.length + state.formData.phone.length + state.formData.location.length !== 0;
    }
  }
})
