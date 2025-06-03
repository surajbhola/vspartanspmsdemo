import React, { useState } from 'react';
import styles from './AllDocumentsSection.module.css';

const AllDocumentsSection = ({ documents }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const openDocumentModal = (doc) => {
    setSelectedDocument(doc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const filterDocuments = () => {
    let filtered = [...documents];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === activeCategory);
    }

    if (dateFilter === 'last30') {
      const date30 = new Date();
      date30.setDate(date30.getDate() - 30);
      filtered = filtered.filter(doc => new Date(doc.date) >= date30);
    } else if (dateFilter === 'last90') {
      const date90 = new Date();
      date90.setDate(date90.getDate() - 90);
      filtered = filtered.filter(doc => new Date(doc.date) >= date90);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredDocuments = filterDocuments();
const handlePrint = () => {
  const printWindow = window.open(selectedDocument.url, '_blank');
  printWindow.focus();

  printWindow.onload = () => {
    printWindow.print();
  };
};
const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: selectedDocument.title,
        url: selectedDocument.url,
      });
    } catch {
      // Fail silently
    }
  } else {
    try {
      await navigator.clipboard.writeText(selectedDocument.url);
      // silently copy
    } catch {
      // silently fail
    }
  }
};


  return (
    <section className={styles.allDocumentsSection}>
      <div className={styles.container}>
        <div className={styles.gridWrapper}>
       
          <div className={styles.sidebar}>
            <div className={styles.sidebarBox}>
              <h3 className={styles.sidebarHeading}>Filter Documents</h3>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Categories</h4>
                {['all', 'regulatory', 'investment', 'framework', 'performance'].map(cat => (
                  <label key={cat} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <span>{cat === 'all' ? 'All Documents' : `${cat.charAt(0).toUpperCase()}${cat.slice(1)} Documents`}</span>
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Date Published</h4>
                {[
                  { key: 'all', label: 'All Time' },
                  { key: 'last30', label: 'Last 30 Days' },
                  { key: 'last90', label: 'Last 90 Days' },
                ].map(({ key, label }) => (
                  <label key={key} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="date"
                      checked={dateFilter === key}
                      onChange={() => setDateFilter(key)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <button className={styles.clearButton} onClick={() => {
                setActiveCategory('all');
                setDateFilter('all');
                setSearchQuery('');
              }}>
                Clear All Filters
              </button>
            </div>
          </div>

    
          <div className={styles.content}>
            <div className={styles.topBar}>
              <h3 className={styles.topBarHeading}>
                {filteredDocuments.length} {filteredDocuments.length === 1 ? 'Document' : 'Documents'} Available
              </h3>
              <div className={styles.sortDropdown}>
                <span>Sort by:</span>
                <select>
                  <option>Latest</option>
                  <option>Oldest</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>

            {filteredDocuments.length > 0 ? (
              <div className={styles.documentGrid}>
                {filteredDocuments.map(doc => (
                  <div key={doc.id} className={styles.card} onClick={() => openDocumentModal(doc)}>
                    <div className={styles.thumbnail}>
                      <img src={doc.thumbnail} alt={doc.title} />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardTop}>
                        <span className={styles.categoryBadge}>
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </span>
                        <span className={styles.dateText}>
                          {new Date(doc.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{doc.title}</h3>
                      <p className={styles.cardDescription}>{doc.description}</p>
                      <div className={styles.cardFooter}>
                        <div className={styles.docMeta}>
                          <i className="fas fa-file-pdf"></i>
                          <span>{doc.type} • {doc.size}</span>
                        </div>
                        <button className={styles.viewButton}>
                          View <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <i className="fas fa-search"></i>
                <h3>No Documents Found</h3>
                <p>We couldn't find any documents matching your search criteria.</p>
                <button onClick={() => {
                  setActiveCategory('all');
                  setDateFilter('all');
                  setSearchQuery('');
                }}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


    {showModal && selectedDocument && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h3>{selectedDocument.title}</h3>
        <button onClick={closeModal}><i className="fas fa-times"></i></button>
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
    <i className="fas fa-download"></i> Download
  </button>
  <button onClick={handlePrint}><i className="fas fa-print"></i> Print</button>
  <button onClick={handleShare}><i className="fas fa-share-alt"></i> Share</button>
</div>

        </div>
      </div>
    </div>
  </div>
)}



    </section>
  );
};

export default AllDocumentsSection;
