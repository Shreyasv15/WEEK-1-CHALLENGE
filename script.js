const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const resumeButton = document.querySelector('#download-resume');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    const clickedInsideNav = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('show'));
}

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      navAnchors.forEach((link) => link.classList.remove('active'));
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you! Your message has been noted. Please connect via email/LinkedIn for faster response.');
});

resumeButton?.addEventListener('click', (event) => {
  event.preventDefault();

  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF library failed to load. Please refresh and try again.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const left = 48;
  const right = pageWidth - 48;
  const contentWidth = right - left;
  const bottomMargin = 52;
  let y = 52;

  const ensureSpace = (required = 20) => {
    if (y + required > pageHeight - bottomMargin) {
      doc.addPage();
      y = 52;
    }
  };

  const writeMainHeading = (text) => {
    ensureSpace(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(21);
    doc.text(text, left, y);
    y += 20;
  };

  const writeHeaderLine = (text) => {
    ensureSpace(15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.text(text, left, y);
    y += 14;
  };

  const drawDivider = () => {
    ensureSpace(12);
    doc.setDrawColor(170, 187, 214);
    doc.line(left, y, right, y);
    y += 12;
  };

  const writeSectionTitle = (text) => {
    ensureSpace(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.text(text.toUpperCase(), left, y);
    y += 11;
    doc.setDrawColor(205, 218, 239);
    doc.line(left, y, right, y);
    y += 11;
  };

  const writeParagraph = (text) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, contentWidth);
    ensureSpace(lines.length * 13 + 3);
    doc.text(lines, left, y);
    y += lines.length * 13 + 3;
  };

  const writeBullet = (text) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(`• ${text}`, contentWidth - 4);
    ensureSpace(lines.length * 13 + 2);
    doc.text(lines, left, y);
    y += lines.length * 13 + 2;
  };

  const writeRole = (title, org, duration) => {
    ensureSpace(34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.8);
    doc.text(title, left, y);
    y += 13;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.3);
    doc.text(`${org} | ${duration}`, left, y);
    y += 15;
  };

  writeMainHeading('SHREYAS V');
  writeHeaderLine('Bengaluru, Karnataka, India');
  writeHeaderLine('Final-Year CSE Student | Data Science Intern | Cybersecurity Enthusiast');
  writeHeaderLine('Email: shreyas.v.1505@gmail.com  |  LinkedIn: www.linkedin.com/in/shreyasv15  |  GitHub: github.com/Shreyasv15');
  drawDivider();

  writeSectionTitle('Professional Summary');
  writeParagraph('Passionate about Data Analytics, Cyber Security, Web Development, AI and Cloud. Focused on building intelligent systems and turning data into real-world solutions.');

  writeSectionTitle('Experience');
  writeRole('Data Science Intern', 'Glowlogics Solutions', 'Present');
  writeRole('Cyber Security and Ethical Hacking Intern', 'Glowlogics Solutions', 'Nov 2025 – Feb 2026');
  writeRole('AICTE Internship – AI Transformative Learning', 'AICTE', 'Feb 2025 – Apr 2025');
  writeRole('Industry 4.0 Foundation – Placement Training', 'Edunet Foundation', 'Completed');

  writeSectionTitle('Projects');
  writeBullet('AI-Based Honeypot Intrusion Detection System (Python, Kali Linux, iptables, AI) — Built honeypot monitoring with AI-based real-time analysis and automated alerts/reporting.');
  writeBullet('AI-Powered Medical Diagnosis System (Python, Pandas, ML) — Developed early disease risk detection model to support faster decisions.');
  writeBullet('3D Network Latency & Anomaly Detector (Python, matplotlib, seaborn, plotly) — Created real-time anomaly dashboard for faster troubleshooting.');
  writeBullet('Cybersecurity Projects: AES/RSA Encryption Tool, Vulnerability Scanner, Password Strength Analyzer, and Phishing Email Simulation.');

  writeSectionTitle('Technical Skills');
  writeBullet('Programming: Python (Proficient), C (Intermediate), Java, C++, JavaScript');
  writeBullet('Web & Database: HTML, CSS, MySQL, DBMS');
  writeBullet('Core Concepts: DSA, OOP, Operating Systems, Computer Networks, Cybersecurity, Data Analysis, Cloud Computing (Basic)');
  writeBullet('Tools: PyCharm, Jupyter Notebook, Google Colab, Jenkins, Visual Studio, Ubuntu, Kali Linux, Git, Power BI, Microsoft Office Suite');

  writeSectionTitle('Certifications');
  writeBullet('Cybersecurity Solutions & Microsoft Defender (Microsoft)');
  writeBullet('Explore Machine Learning using Python, AI-first Software Engineering, Prompt Engineering (Infosys)');
  writeBullet('Foundation of Cybersecurity (Coursera) | Cybersecurity Fundamentals (IBM)');
  writeBullet('Goldman Sachs Software Engineering Job Simulation | NLP, ChatGPT and Prompt Engineering Training');

  writeSectionTitle('Achievements & Extra-Curricular');
  writeBullet('Black Belt in Karate with State/District medals.');
  writeBullet('2nd Place — Python for Data Science Workshop (2024).');
  writeBullet('Google Cloud Arcade & Study Jam Awards.');
  writeBullet('GDSC SVCE, NSS Volunteer, Karate leadership and mentoring.');

  writeSectionTitle('Languages');
  writeBullet('English (Proficient), Hindi (Proficient), Kannada (Proficient), Tamil (Conversational)');

  doc.save('Shreyas_V_Resume.pdf');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});