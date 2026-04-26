const cvData = {
  mn: {
    nav: {
      about: "Миний тухай",
      experience: "Туршлага",
      skills: "Ур чадвар",
      projects: "Шийдлүүд"
    },
    hero: {
      greeting: "Сайн байна уу, намайг",
      name: "Чулуунцэцэг Хонгор",
      roles: ["Senior Programmer", "Chief Technology Officer", "System Administrator", "Data Analyst", "Software Engineer"],
      rolePrefix: "Би бол ",
      summary: "Програм хангамжийн бакалавр зэрэгтэй, мэдээллийн технологийн салбарт олон талын туршлагатай мэргэжилтэн. Инфраструктур, сүлжээ, програм хангамж хөгжүүлэлт, өгөгдлийн аналитик зэрэг чиглэлүүдээр гүнзгий мэдлэгтэй.",
      btnProjects: "Гүйцэтгэсэн ажлууд",
      btnContact: "Холбогдох"
    },
    about: {
      title: "Миний тухай",
      eduTitle: "Боловсрол & Мэргэжил",
      eduDesc: "Програм хангамжийн бакалавр зэрэгтэй. Технологийн хурдацтай хувьсалд дасан зохицож, байнга шинийг эрэлхийлж, суралцдаг.",
      eduFeatures: [
        "Асуудал шийдвэрлэх өндөр чадвар",
        "Багийн удирдлага болон төслийн менежмент",
        "Системийн архитектур төлөвлөлт"
      ],
      certTitle: "Сертификат & Амжилтууд",
      certDesc: "Мэргэжлийн түвшинд баталгаажсан ур чадварууд:",
      certTags: ["Data Analyst", "Project Management", "Python", "C#", "Node.js"],
      achieveTitle: "Бусад амжилтууд:",
      achievements: [
        { name: "LeetCode", desc: "Алгоритм өгөгдлийн бүтцийн өндөр түвшний мэдлэг" },
        { name: "HackTheBox", desc: "Кибер аюулгүй байдал, системийн хамгаалалтын өндөр түвшний мэдлэг" }
      ]
    },
    experience: {
      title: "Ажлын туршлага",
      list: [
        {
          title: "Chief Technology Officer (CTO)",
          desc: "Технологийн багийг удирдаж, байгууллагын мэдээллийн технологийн стратеги, архитектурыг тодорхойлон, дэд бүтэц болон програм хангамжийн төслүүдийг амжилттай хэрэгжүүлсэн."
        },
        {
          title: "Senior Programmer",
          desc: "Нарийн төвөгтэй системүүдийн хөгжүүлэлтийг хариуцаж, багийн бусад хөгжүүлэгчдийг чиглүүлэн, кодын чанар болон системийн найдвартай ажиллагааг хангасан."
        },
        {
          title: "System Administrator",
          desc: "Linux, Windows, macOS сервер болон хэрэглэгчийн компьютеруудын хэвийн ажиллагаа, аюулгүй байдлыг хангаж, дотоод сүлжээ, виртуалчлалын орчинг удирдсан."
        },
        { 
          title: "Programmer",
          desc: "Төрөл бүрийн веб болон дотоод хэрэглээний системүүдийг хөгжүүлж, технологийн шинэ шийдлүүдийг нэвтрүүлэхэд идэвхтэй оролцсон."
        }
      ]
    },
    skills: {
      title: "Технологийн мэдлэг",
      subtitle: "Дундаас дээш түвшинд эзэмшсэн технологиуд болон хэрэгслүүд",
      categories: [
        {
          icon: "bx-code-curly",
          title: "Хэл & Фреймворк",
          items: [
            { icon: "bxl-python", name: "Python" },
            { icon: "bxl-nodejs", name: "Node.js" },
            { icon: "bxl-go-lang", name: "Go" },
            { icon: "bxl-php", name: "PHP" },
            { icon: "", name: "C#" },
            { icon: "bxl-react", name: "Next.js" },
            { icon: "", name: "NestJS" }
          ]
        },
        {
          icon: "bx-data",
          title: "Өгөгдлийн сан",
          items: [
            { icon: "bxl-postgresql", name: "PostgreSQL" },
            { icon: "bxl-postgresql", name: "OracleSQL" },
            { icon: "bxl-mongodb", name: "MongoDB" },
            { icon: "", name: "MySQL" },
            { icon: "", name: "ScyllaDB" },
            { icon: "", name: "Redis" }
          ]
        },
        {
          icon: "bx-cloud",
          title: "Үүлэн технологи & Дэд бүтэц",
          items: [
            { icon: "bxl-aws", name: "AWS" },
            { icon: "bxl-google-cloud", name: "Google Cloud" },
            { icon: "", name: "VMWare" },
            { icon: "", name: "Proxmox" },
            { icon: "bxl-windows", name: "Windows Server" },
            { icon: "bxl-apple", name: "macOS" },
            { icon: "bxl-tux", name: "Linux" }
          ]
        },
        {
          icon: "bx-server",
          title: "Вэб сервер & Бусад",
          items: [
            { icon: "", name: "Nginx" },
            { icon: "", name: "Apache" },
            { icon: "", name: "n8n (Automation)" }
          ]
        }
      ]
    },
    projects: {
      title: "Гүйцэтгэсэн шийдлүүд",
      list: [
        {
          type: "Интеграци & Аюулгүй байдал",
          title: "Тоон гарын үсгийн холболт",
          desc: "Байгууллагын системүүдэд албан ёсны тоон гарын үсгийн технологийг амжилттай нэвтрүүлж, баримт бичгийн цахим шилжилтийг хурдасгасан.",
          techs: ["Cryptography", "API Integration", "Security"]
        },
        {
          type: "Хяналт хамгаалалт (IoT)",
          title: "Хяналтын камер & Төхөөрөмжийн интеграци",
          desc: "ZKTeco, Hikvision, Dahua зэрэг тэргүүлэх брэндүүдийн төхөөрөмжүүдтэй програм хангамжийн түвшинд харилцан ажиллах, мэдээлэл цуглуулах шийдлийг боловсруулсан.",
          techs: ["ZKTeco", "Hikvision", "Dahua", "SDK"]
        },
        {
          type: "Техник хангамж (RFID)",
          title: "RFID UHF хяналтын шийдэл",
          desc: "RFID болон UHF технологиудыг ашиглан бараа материал болон хүмүүсийн хөдөлгөөнийг бүртгэх, удирдах төрөл бүрийн хяналт хамгаалалтын системүүдийг нэвтрүүлсэн.",
          techs: ["RFID", "UHF", "Automation"]
        },
        {
          type: "Дэд бүтэц",
          title: "Сервер & Сүлжээний удирдлага",
          desc: "Байгууллагын дотоод серверүүд (Linux, Windows, macOS) болон виртуалчлалын (VMWare, Proxmox) архитектурыг зохион байгуулж, тасралтгүй ажиллагааг хангасан.",
          techs: ["Linux", "VMWare", "Proxmox", "Networking"]
        }
      ]
    },
    analysis: {
      title: "Технологийн ур чадвар ба Туршлагын шинжилгээ (Дэлгэрэнгүй)",
      desc: "Энэхүү матриц нь миний техникийн гүнзгий мэдлэг, системүүдийг хооронд нь уялдуулах чадвар болон бизнесийн үйл ажиллагааг технологиор дэмжих чадамжийг харуулна.",
      list: [
        {
          category: "1. Observability & Monitoring",
          tools: "Prometheus, Grafana, ELK Stack, Alertmanager",
          impact: "Системийн \"эрүүл мэнд\"-ийг 24/7 цаг тухай бүрт нь хянаж, асуудал үүсэхээс өмнө урьдчилан мэдээлнэ. График дүрслэлүүд нь удирдлагын багт системийн ачааллыг ойлгомжтойгоор харах боломж олгодог."
        },
        {
          category: "2. SecOps & Cybersecurity",
          tools: "Wazuh (SIEM/XDR), OpenSCAP, Vulnerability Detection",
          impact: "Халдлагыг бодит хугацаанд илрүүлж, системийн эмзэг байдлыг тогтмол шалгана. Энэ нь дата алдагдах эрсдэлийг 90% хүртэл бууруулж, аюулгүй байдлын стандартуудыг (Compliance) хангахад тусалдаг."
        },
        {
          category: "3. Workflow Automation",
          tools: "n8n, Zapier, Custom Python Scripts",
          impact: "Бизнесийн давтагддаг процессуудыг (жишээ нь: CRM болон ERP-г холбох, автомат тайлан илгээх) код бичихгүйгээр эсвэл бага кодоор автоматжуулж, ажилтнуудын цагийг хэмнэх, алдааг тэглэх үр дүнтэй."
        },
        {
          category: "4. Cloud Native & Infrastructure",
          tools: "Kubernetes, Docker, Terraform, Helm",
          impact: "Дэд бүтцийг \"код\" байдлаар удирдах (IaC) боломжийг олгоно. Системийг хэдхэн минутын дотор шинээр босгох эсвэл өөр сервер рүү шилжүүлэх уян хатан байдлыг бүрдүүлнэ."
        },
        {
          category: "5. Системийн Архитектур",
          tools: "Microservices, Event-driven (Kafka/RabbitMQ), API Design",
          impact: "Нарийн төвөгтэй системийг жижиг хэсгүүдэд хувааж, хэсэг тус бүрийг хараат бусаар хөгжүүлэх боломжийг олгоно. Энэ нь системийн засвар үйлчилгээ хийх зардлыг бууруулна."
        },
        {
          category: "6. Өгөгдлийн удирдлага",
          tools: "PostgreSQL, Redis, ClickHouse, Data Pipelines",
          impact: "Их хэмжээний өгөгдөл дээр анализ хийх, хурдтай хайлт хийх боломжийг олгоно. ClickHouse зэрэг технологи нь \"Big Data\" анализийг секунд хүрэхгүй хугацаанд хийхэд тусалдаг."
        },
        {
          category: "7. DevOps & Engineering Culture",
          tools: "CI/CD (GitHub Actions), GitOps, Automated Testing",
          impact: "Шинэ кодыг систем рүү алдаагүй, хурдтай оруулах соёлыг бүрдүүлнэ. Хүний оролцоотой алдааг (Human error) арилгаж, хөгжүүлэлтийн хурдыг 2-3 дахин нэмэгдүүлнэ."
        },
        {
          category: "8. Технологийн удирдлага",
          tools: "Tech Stack Selection, Cost Optimization, Team Mentoring",
          impact: "Бизнесийн зорилгод нийцсэн хамгийн оновчтой технологийг сонгох замаар төслийн төсвийг хэмнэх, багийн гишүүдийг сургаж, чадваржуулах стратегийн ач холбогдолтой."
        }
      ],
      summaryTitle: "Гол үр нөлөөний нарийвчилсан дүгнэлт & Хамтын ажиллагаа",
      summaryItems: [
        { label: "Observability (Үзэгдэх байдал)", text: "Prometheus болон Grafana-г ашигласнаар системд юу болж байгааг \"сохор\" биш, харин тоон үзүүлэлт бүрээр нь хянах чадвартай. Энэ нь асуудлыг шийдвэрлэх хугацааг (MTTR) эрс багасгадаг." },
        { label: "Proactive Security (Урьдчилан сэргийлэх аюулгүй байдал)", text: "Wazuh ашиглаж байгаа нь зөвхөн асуудал гарсны дараа биш, харин халдлага орох оролдлого хийх үед нь мэдэх, системд зөвшөөрөлгүй өөрчлөлт ороход тэр даруй хариу арга хэмжээ авах чадвартайг харуулж байна." },
        { label: "Efficiency through Automation (Автоматжуулалтын үр ашиг)", text: "n8n-ийг ашиглан системүүдийг холбох нь өндөр өртөгтэй хөгжүүлэгчдийн цагийг хэмнэж, бизнесийн ложистик болон үйл ажиллагааны \"цорго\"-нуудыг хурдтай нээхэд тусалдаг." },
        { label: "Cost-Effective Scalability (Зардалд хэмнэлттэй өргөжилт)", text: "Cloud болон Containerization-ийг зөв ашигласнаар техник хангамжийн нөөцийг 100% үр ашигтай ашиглаж, шаардлагагүй үед серверийн зардлыг танах боломжтой." },
        { label: "Надтай хамтран ажиллах хүрээ", text: "Системийн архитектур төлөвлөх, аюулгүй байдлыг сайжруулах, дэд бүтцийн зардлыг оновчлох, багийг чиглүүлэх болон автоматжуулалт нэвтрүүлэх." }
      ]
    },
    footer: {
      builtWith: "Built with",
      by: "by Чулуунцэцэг Хонгор",
      rights: "© 2026 All rights reserved."
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects"
    },
    hero: {
      greeting: "Hello, my name is",
      name: "Khongor Chuluuntsetseg",
      roles: ["Senior Programmer", "Chief Technology Officer", "System Administrator", "Data Analyst", "Software Engineer"],
      rolePrefix: "I am a ",
      summary: "Bachelor's degree in Software Engineering and versatile IT professional. Deeply knowledgeable in infrastructure, networking, software development, and data analytics.",
      btnProjects: "View Projects",
      btnContact: "Contact Me"
    },
    about: {
      title: "About Me",
      eduTitle: "Education & Profession",
      eduDesc: "Hold a Bachelor's degree in Software Engineering. Highly adaptable to rapid technological shifts, constantly seeking innovation and continuous learning.",
      eduFeatures: [
        "Strong problem-solving skills",
        "Team leadership and project management",
        "System architecture planning"
      ],
      certTitle: "Certifications & Achievements",
      certDesc: "Professionally certified skills:",
      certTags: ["Data Analyst", "Project Management", "Python", "C#", "Node.js"],
      achieveTitle: "Other achievements:",
      achievements: [
        { name: "LeetCode", desc: "High score, deep knowledge of algorithms and data structures" },
        { name: "HackTheBox", desc: "Cybersecurity and system protection skills" }
      ]
    },
    experience: {
      title: "Work Experience",
      list: [
        {
          title: "Chief Technology Officer (CTO)",
          desc: "Led the technology team, defined enterprise IT strategy and architecture, and successfully executed infrastructure and software projects."
        },
        {
          title: "Senior Programmer",
          desc: "Responsible for developing complex systems, guiding fellow developers, and ensuring code quality and system reliability."
        },
        {
          title: "System Administrator",
          desc: "Maintained health and security of Linux, Windows, macOS servers and client PCs; managed internal networks and virtualization environments."
        },
        {
          title: "Programmer",
          desc: "Developed various web and internal applications, actively participating in introducing new technology solutions."
        }
      ]
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies and tools mastered at an advanced level",
      categories: [
        {
          icon: "bx-code-curly",
          title: "Languages & Frameworks",
          items: [
            { icon: "bxl-python", name: "Python" },
            { icon: "bxl-nodejs", name: "Node.js" },
            { icon: "bxl-go-lang", name: "Go" },
            { icon: "bxl-php", name: "PHP" },
            { icon: "", name: "C#" },
            { icon: "bxl-react", name: "Next.js" },
            { icon: "", name: "NestJS" }
          ]
        },
        {
          icon: "bx-data",
          title: "Databases",
          items: [
            { icon: "bxl-postgresql", name: "PostgreSQL" },
            { icon: "bxl-postgresql", name: "OracleSQL" },
            { icon: "bxl-mongodb", name: "MongoDB" },
            { icon: "", name: "MySQL" },
            { icon: "", name: "ScyllaDB" },
            { icon: "", name: "Redis" }
          ]
        },
        {
          icon: "bx-cloud",
          title: "Cloud & Infrastructure",
          items: [
            { icon: "bxl-aws", name: "AWS" },
            { icon: "bxl-google-cloud", name: "Google Cloud" },
            { icon: "", name: "VMWare" },
            { icon: "", name: "Proxmox" },
            { icon: "bxl-windows", name: "Windows Server" },
            { icon: "bxl-apple", name: "macOS" },
            { icon: "bxl-tux", name: "Linux" }
          ]
        },
        {
          icon: "bx-server",
          title: "Web Servers & Others",
          items: [
            { icon: "", name: "Nginx" },
            { icon: "", name: "Apache" },
            { icon: "", name: "n8n (Automation)" }
          ]
        }
      ]
    },
    projects: {
      title: "Implemented Solutions",
      list: [
        {
          type: "Integration & Security",
          title: "Digital Signature Integration",
          desc: "Successfully integrated official digital signature technology into enterprise systems, accelerating the transition to electronic documents.",
          techs: ["Cryptography", "API Integration", "Security"]
        },
        {
          type: "Monitoring & IoT",
          title: "CCTV & Device Integration",
          desc: "Developed a solution to interoperate and collect data at the software level with devices from leading brands like ZKTeco, Hikvision, and Dahua.",
          techs: ["ZKTeco", "Hikvision", "Dahua", "SDK"]
        },
        {
          type: "Hardware (RFID)",
          title: "RFID UHF Tracking Solutions",
          desc: "Implemented various security and tracking systems utilizing RFID and UHF technologies to register and manage inventory and personnel movement.",
          techs: ["RFID", "UHF", "Automation"]
        },
        {
          type: "Infrastructure",
          title: "Server & Network Management",
          desc: "Organized the architecture of internal servers (Linux, Windows, macOS) and virtualization (VMWare, Proxmox), ensuring high availability.",
          techs: ["Linux", "VMWare", "Proxmox", "Networking"]
        }
      ]
    },
    analysis: {
      title: "Technical Skills & Experience Analysis (Detailed)",
      desc: "This matrix demonstrates my deep technical knowledge, ability to integrate systems, and capability to support business operations through technology.",
      list: [
        {
          category: "1. Observability & Monitoring",
          tools: "Prometheus, Grafana, ELK Stack, Alertmanager",
          impact: "Monitors system \"health\" 24/7 in real-time, predicting issues before they arise. Visualizations provide the management team with clear insights into system load."
        },
        {
          category: "2. SecOps & Cybersecurity",
          tools: "Wazuh (SIEM/XDR), OpenSCAP, Vulnerability Detection",
          impact: "Detects attacks in real-time and regularly scans for system vulnerabilities. This reduces data loss risks by up to 90% and helps meet security compliance standards."
        },
        {
          category: "3. Workflow Automation",
          tools: "n8n, Zapier, Custom Python Scripts",
          impact: "Automates repetitive business processes (e.g., connecting CRM and ERP, sending automated reports) using no-code or low-code solutions, saving employee time and eliminating errors."
        },
        {
          category: "4. Cloud Native & Infrastructure",
          tools: "Kubernetes, Docker, Terraform, Helm",
          impact: "Enables Infrastructure as Code (IaC) management. Provides the flexibility to spin up systems from scratch in minutes or migrate to another server seamlessly."
        },
        {
          category: "5. System Architecture",
          tools: "Microservices, Event-driven (Kafka/RabbitMQ), API Design",
          impact: "Breaks down complex systems into smaller components, allowing independent development of each part. This significantly reduces system maintenance costs."
        },
        {
          category: "6. Data Management",
          tools: "PostgreSQL, Redis, ClickHouse, Data Pipelines",
          impact: "Facilitates analysis and high-speed searching on massive datasets. Technologies like ClickHouse enable \"Big Data\" analytics in sub-second times."
        },
        {
          category: "7. DevOps & Engineering Culture",
          tools: "CI/CD (GitHub Actions), GitOps, Automated Testing",
          impact: "Cultivates a culture of rapid and error-free code deployment. Eliminates human error and increases development speed by 2-3 times."
        },
        {
          category: "8. Technology Management",
          tools: "Tech Stack Selection, Cost Optimization, Team Mentoring",
          impact: "Strategically selects optimal technologies aligning with business goals, saving project budgets, and focuses on mentoring and upskilling team members."
        }
      ],
      summaryTitle: "Detailed Impact Summary & Collaboration",
      summaryItems: [
        { label: "Observability", text: "By using Prometheus and Grafana, I monitor systems not \"blindly\", but through precise metrics. This significantly reduces Mean Time To Resolution (MTTR)." },
        { label: "Proactive Security", text: "Using Wazuh means I don't just react after an incident, but detect intrusion attempts immediately and respond instantly to unauthorized system changes." },
        { label: "Efficiency through Automation", text: "Integrating systems via n8n saves expensive developer hours and rapidly unblocks business logistics and operational bottlenecks." },
        { label: "Cost-Effective Scalability", text: "Through proper utilization of Cloud and Containerization, hardware resources are used at 100% efficiency, enabling cost-cutting when scaling is unnecessary." },
        { label: "Collaboration Opportunities", text: "System architecture planning, security enhancement, infrastructure cost optimization, team mentoring, and implementing automation." }
      ]
    },
    footer: {
      builtWith: "Built with",
      by: "by Khongor Chuluuntsetseg",
      rights: "© 2026 All rights reserved."
    }
  }
};
