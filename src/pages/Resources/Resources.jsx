import React, { useState } from 'react'
import InvestorResourcesHeader from '../../components/InvestorResourcesHeader/InvestorResourcesHeader'
import FeaturedDocumentsSection from '../../components/FeaturedDocumentsSection/FeaturedDocumentsSection'
import AllDocumentsSection from '../../components/AllDocumentsSection/AllDocumentsSection';
//  const featuredDocuments = [
//     {
//       id: 1,
//       title: "Investor Charter",
//       description:
//         "Key rights and responsibilities for investors as per SEBI guidelines",
//       category: "regulatory",
//       type: "PDF",
//       size: "1.2 MB",
//       date: "2025-04-15",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20document%20with%20gold%20seal%20and%20official%20stamp%20on%20premium%20paper%20with%20navy%20blue%20header%2C%20showing%20investor%20charter%20with%20elegant%20typography%20and%20formal%20layout%2C%20high%20quality%20business%20document&width=300&height=400&seq=101&orientation=portrait",
//     },
//     {
//       id: 2,
//       title: "Disclosure Documents",
//       description:
//         "Complete disclosure of investment strategies, risks, and fee structure",
//       category: "regulatory",
//       type: "PDF",
//       size: "3.5 MB",
//       date: "2025-05-10",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20legal%20document%20with%20disclosure%20statements%20and%20financial%20data%20tables%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=102&orientation=portrait",
//     },
//     {
//       id: 3,
//       title: "Complaint Redressal",
//       description:
//         "Process and guidelines for addressing investor grievances and complaints",
//       category: "regulatory",
//       type: "PDF",
//       size: "0.8 MB",
//       date: "2025-03-22",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20customer%20service%20document%20with%20flowchart%20showing%20complaint%20resolution%20process%20on%20premium%20paper%20with%20corporate%20branding%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=103&orientation=portrait",
//     },
//   ];
//   const allDocuments = [
//     ...featuredDocuments,
//     {
//       id: 4,
//       title: "Investment Memo: Technology Sector",
//       description:
//         "Analysis and outlook for technology sector investments in 2025",
//       category: "investment",
//       type: "PDF",
//       size: "2.3 MB",
//       date: "2025-05-20",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20investment%20document%20with%20technology%20sector%20graphs%20and%20analysis%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20charts%20showing%20tech%20stock%20performance&width=300&height=400&seq=104&orientation=portrait",
//     },
//     {
//       id: 5,
//       title: "Accredited Investor Framework",
//       description:
//         "Guidelines and criteria for qualifying as an accredited investor",
//       category: "framework",
//       type: "PDF",
//       size: "1.5 MB",
//       date: "2025-02-15",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20legal%20document%20with%20accredited%20investor%20criteria%20and%20checkboxes%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=105&orientation=portrait",
//     },
//     {
//       id: 6,
//       title: "Market Outlook 2025",
//       description:
//         "Comprehensive analysis of market trends and investment opportunities",
//       category: "investment",
//       type: "PDF",
//       size: "4.2 MB",
//       date: "2025-01-10",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20market%20analysis%20document%20with%20economic%20charts%20and%20global%20market%20trends%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20financial%20forecasting%20graphs&width=300&height=400&seq=106&orientation=portrait",
//     },
//     {
//       id: 7,
//       title: "Risk Management Framework",
//       description:
//         "Detailed approach to identifying, assessing, and mitigating investment risks",
//       category: "framework",
//       type: "PDF",
//       size: "2.8 MB",
//       date: "2025-04-05",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20risk%20management%20document%20with%20risk%20assessment%20matrix%20and%20mitigation%20strategies%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20business%20planning%20document&width=300&height=400&seq=107&orientation=portrait",
//     },
//     {
//       id: 8,
//       title: "Quarterly Performance Report: Q1 2025",
//       description:
//         "Detailed performance analysis of VSpartans investment strategies",
//       category: "performance",
//       type: "PDF",
//       size: "3.1 MB",
//       date: "2025-04-30",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20quarterly%20report%20with%20performance%20charts%20and%20financial%20data%20tables%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20investment%20performance%20graphs&width=300&height=400&seq=108&orientation=portrait",
//     },
//     {
//       id: 9,
//       title: "ESG Investment Framework",
//       description:
//         "Guidelines for environmental, social, and governance focused investments",
//       category: "framework",
//       type: "PDF",
//       size: "2.4 MB",
//       date: "2025-03-15",
//       thumbnail:
//         "https://readdy.ai/api/search-image?query=Professional%20ESG%20document%20with%20sustainability%20metrics%20and%20corporate%20governance%20guidelines%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20environmental%20impact%20charts&width=300&height=400&seq=109&orientation=portrait",
//     },
//   ];



const featuredDocuments = [
  {
    id: 1,
    title: "Investor Charter PMS",
    description:
      "Key rights and responsibilities for investors as per SEBI guidelines",
    category: "regulatory",
    type: "PDF",
    size: "1.2 MB",
    date: "2025-04-15",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20document%20with%20gold%20seal%20and%20official%20stamp%20on%20premium%20paper%20with%20navy%20blue%20header%2C%20showing%20investor%20charter%20with%20elegant%20typography%20and%20formal%20layout%2C%20high%20quality%20business%20document&width=300&height=400&seq=101&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2025/04/Investor-Charter_PMS.pdf",
  },
  {
    id: 2,
    title: "VSpartans Disclosure Document",
    description:
      "Complete disclosure of investment strategies, risks, and fee structure",
    category: "regulatory",
    type: "PDF",
    size: "3.5 MB",
    date: "2025-05-10",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20legal%20document%20with%20disclosure%20statements%20and%20financial%20data%20tables%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=102&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2025/03/VSPARTANS-DISCLOSURE-DOCUMENT.pdf",
  },
  {
    id: 3,
    title: "Complaint Data PMS",
    description:
      "Process and guidelines for addressing investor grievances and complaints",
    category: "regulatory",
    type: "PDF",
    size: "0.8 MB",
    date: "2025-03-22",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20customer%20service%20document%20with%20flowchart%20showing%20complaint%20resolution%20process%20on%20premium%20paper%20with%20corporate%20branding%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=103&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2025/05/ComplaintData_PMS.pdf",
  },
];

const allDocuments = [
  ...featuredDocuments,
  {
    id: 4,
    title: "Investment Memo",
    description:
      "Analysis and outlook for technology sector investments in 2025",
    category: "investment",
    type: "PDF",
    size: "2.3 MB",
    date: "2025-05-20",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20investment%20document%20with%20technology%20sector%20graphs%20and%20analysis%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20charts%20showing%20tech%20stock%20performance&width=300&height=400&seq=104&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2024/11/Investment-Memo.pdf",
  },
  {
    id: 5,
    title: "Accredited Investor Framework",
    description:
      "Guidelines and criteria for qualifying as an accredited investor",
    category: "framework",
    type: "PDF",
    size: "1.5 MB",
    date: "2025-02-15",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20legal%20document%20with%20accredited%20investor%20criteria%20and%20checkboxes%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=105&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2024/11/Accredited-Investor-Framework.pdf",
  },
  {
    id: 6,
    title: "Grievance Redressal Mechanism PMS",
    description:
      "Mechanism to address and resolve investor grievances promptly",
    category: "regulatory",
    type: "PDF",
    size: "1.0 MB",
    date: "2025-04-10",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20customer%20service%20document%20with%20flowchart%20showing%20complaint%20resolution%20process%20on%20premium%20paper%20with%20corporate%20branding%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents%2C%20official%20business%20document%20with%20seal&width=300&height=400&seq=110&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2025/04/Grievance-Redressal-Mechanism_PMS.pdf",
  },
  {
    id: 7,
    title: "PMS Charter",
    description:
      "Charter outlining principles and commitments of PMS operations",
    category: "framework",
    type: "PDF",
    size: "1.3 MB",
    date: "2024-11-20",
    thumbnail:
      "https://readdy.ai/api/search-image?query=Professional%20legal%20document%20with%20charter%20and%20policy%20statements%20on%20premium%20paper%20with%20corporate%20letterhead%2C%20featuring%20clean%20layout%20with%20navy%20blue%20and%20gold%20accents&width=300&height=400&seq=111&orientation=portrait",
    url: "https://vspartanspms.com/wp-content/uploads/2024/11/PMS-Charter.pdf",
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openDocumentModal = (doc) => {
    alert(`Open modal for: ${doc.title}`);

  };
  return (
    <div>
      <FeaturedDocumentsSection featuredDocuments={allDocuments.slice(0, 3)}
        openDocumentModal={openDocumentModal}
></FeaturedDocumentsSection>
      <InvestorResourcesHeader  searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}></InvestorResourcesHeader>
<AllDocumentsSection documents={filteredDocuments}></AllDocumentsSection>
    </div>
  )
}

export default Resources;
