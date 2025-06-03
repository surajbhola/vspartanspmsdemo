import React, { useState, useRef } from "react";
import styles from "./FeaturedDocumentsSection.module.css";
import { FaFilePdf, FaArrowRight, FaTimes, FaPrint, FaDownload, FaShareAlt } from "react-icons/fa";

const FeaturedDocumentsSection = ({ featuredDocuments }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const iframeRef = useRef(null);

  const openDocumentModal = (doc) => {
    setSelectedDocument(doc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const handlePrint = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleShare = async () => {
    if (navigator.share && selectedDocument) {
      try {
        await navigator.share({
          title: selectedDocument.title,
          url: selectedDocument.url,
        });
      } catch {
        // fail silently
      }
    } else if (selectedDocument) {
      try {
        await navigator.clipboard.writeText(selectedDocument.url);
        // copied silently
      } catch {
        // fail silently
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Featured Documents</h2>
        <div className={styles.grid}>
          {featuredDocuments.map((doc) => (
            <div
              key={doc.id}
              className={styles.card}
              onClick={() => openDocumentModal(doc)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={doc.thumbnail}
                  alt={doc.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>
                    {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                  </span>
                  <span className={styles.date}>
                    {new Date(doc.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className={styles.title}>{doc.title}</h3>
                <p className={styles.description}>{doc.description}</p>
                <div className={styles.footer}>
                  <div className={styles.metaDetail}>
                    <FaFilePdf className={styles.pdfIcon} />
                    <span>{doc.type} • {doc.size}</span>
                  </div>
                  <button className={styles.viewButton}>
                    View Document <FaArrowRight className={styles.arrowIcon} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {showModal && selectedDocument && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{selectedDocument.title}</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalLeft}>
                <img src={selectedDocument.thumbnail} alt={selectedDocument.title} />
                <div className={styles.docDetails}>
                  <h4>Document Details</h4>
                  <ul>
                    <li><strong>Category:</strong> {selectedDocument.category}</li>
                    <li><strong>File Type:</strong> {selectedDocument.type}</li>
                    <li><strong>Size:</strong> {selectedDocument.size}</li>
                    <li><strong>Published:</strong> {new Date(selectedDocument.date).toLocaleDateString()}</li>
                  </ul>
                </div>
              </div>
              <div className={styles.modalRight}>
                <h4>Description</h4>
                <p>{selectedDocument.description}</p>

                <div className={styles.previewBox} style={{ height: '500px', border: '1px solid #ccc' }}>
                  <iframe
                    ref={iframeRef}
                    src={selectedDocument.url}
                    title={selectedDocument.title}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                  />
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => window.open(selectedDocument.url, '_blank')}
                  >
                    <FaDownload /> Download
                  </button>
                  <button onClick={handlePrint}><FaPrint /> Print</button>
                  <button onClick={handleShare}><FaShareAlt /> Share</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDocumentsSection;
