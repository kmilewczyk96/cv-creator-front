import { defineStore } from 'pinia'
import type IEditorStoreState from "@/interfaces/editorStoreState.ts";


export const useEditorStore = defineStore('editorStore', {
  state: (): IEditorStoreState => ({
    currentSection: "personal",
    formData: {
      full_name: "Tester Testerovic",
      position_title: "Fullstack developer",
      email: "test@example.com",
      phone: "+48 000 000 000",
      location: "Poland, UTC+01",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",

      experience_formset: [
        {
          title: "Fullstack Developer",
          company: "Monser Inc.",
          start_date: "2025-01",
          end_date: "2025-12",
          is_ongoing: true,
          description: "Built and maintained full‑stack features using Vue, Quasar, TypeScript, and Node.js. Collaborated with designers and product managers to deliver high‑quality user experiences.",
        },
        {
          title: "Backend Developer",
          company: "Monser Inc.",
          start_date: "2024-01",
          end_date: "2024-12",
          is_ongoing: false,
          description: "Implemented REST APIs, optimized PostgreSQL queries, and introduced CI pipelines to improve deployment reliability.",
        },
        {
          title: "Frontend Developer",
          company: "Astera Labs",
          start_date: "2023-01",
          end_date: "2023-12",
          is_ongoing: false,
          description: "Migrated a legacy Vue 2 app to Vue 3 + Vite, improved Lighthouse scores by 25%.",
        },
        {
          title: "Fullstack Developer",
          company: "HelixWorks",
          start_date: "2019-01",
          end_date: "2019-12",
          is_ongoing: false,
          description: "Introduced component libraries and storybook documentation to speed up development.",
        },
        {
          title: "Backend Engineer",
          company: "DataForge",
          start_date: "2018-01",
          end_date: "2018-12",
          is_ongoing: false,
          description: "Authored data processing pipelines and cron workers with Node and Redis.",
        },
        {
          title: "Web Developer",
          company: "BrightMedia",
          start_date: "2017-01",
          end_date: "2017-12",
          is_ongoing: false,
          description: "Built responsive UIs with Vue and SCSS; collaborated closely with marketing teams.",
        },
        {
          title: "Fullstack Engineer",
          company: "Quantum Apps",
          start_date: "2016-01",
          end_date: "2016-12",
          is_ongoing: false,
          description: "Designed RESTful services and integrated third‑party APIs (Stripe, Auth0).",
        },
        {
          title: "Software Engineer",
          company: "VectorX",
          start_date: "2015-01",
          end_date: "2015-12",
          is_ongoing: false,
          description: "Maintained legacy systems and gradually introduced TypeScript for safety.",
        },
        {
          title: "Junior Backend Developer",
          company: "NetPulse",
          start_date: "2014-01",
          end_date: "2014-12",
          is_ongoing: false,
          description: "Implemented background jobs and improved API response times by 15%.",
        },
      ],
      education_formset: [
        {
          title: "MSc Computer Science",
          school: "Gdańsk University of Technology",
          start_date: "2018-10",
          end_date: "2020-07",
          is_ongoing: false,
          description: "Specialized in distributed systems and software architecture. Thesis on event‑driven microservices.",
        },
        {
          title: "BSc Computer Science",
          school: "Gdańsk University of Technology",
          start_date: "2015-10",
          end_date: "2018-07",
          is_ongoing: false,
          description: "Coursework in algorithms, databases, and web development.",
        },

      ],

      skills: "Python, React, JavaScript, HTML, CSS, RESTful APIs, SQL, Git, Node.js, TypeScript, Docker, Agile methodologies, Unit testing, Microservices, Redux, GraphQL, Webpack, SEO fundamentals, Performance optimization, Cloud services (AWS/Azure), CI/CD, Responsive design",
      footer: "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).",
    },
  }),
  actions: {
    addNewForm(relatedSection: TSectionWithFormset): void {
      switch (relatedSection) {
        case "experience":
          this.formData.experience_formset.push({
            title: "",
            company: "",
            start_date: "",
            end_date: "",
            is_ongoing: false,
            description: "",
          });
          break;
        case "education":
          this.formData.education_formset.push({
            title: "",
            school: "",
            start_date: "",
            end_date: "",
            is_ongoing: false,
            description: "",
          });
          break;
      }
    },
    setCurrentSection(sectionName: TEditorSection): void {
      this.currentSection = sectionName;
    }
  },
  getters: {
    hasContactData(state): boolean {
      return state.formData.email.length + state.formData.phone.length + state.formData.location.length !== 0;
    },
  }
})
