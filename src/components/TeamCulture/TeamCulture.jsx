import React from "react";
import styles from "./TeamCulture.module.css";

const images = [
  {
    src: "https://readdy.ai/api/search-image?query=A%2520professional%2520team%2520of%2520Indian%2520financial%2520consultants%2520collaborating%2520in%2520a%2520modern%2520office%2520meeting%2520room%2520with%2520glass%2520walls.%2520The%2520team%2520is%2520diverse%2520in%2520age%2520and%2520gender%252C%2520all%2520wearing%2520business%2520attire%2520with%2520navy%2520blue%2520and%2520gold%2520accents.%2520They%2520are%2520engaged%2520in%2520discussion%2520around%2520financial%2520charts%2520and%2520documents%2520on%2520a%2520conference%2520table.%2520The%2520atmosphere%2520is%2520professional%2520yet%2520collaborative%2520with%2520natural%2520lighting.&width=600&height=400&seq=26&orientation=landscape",
    alt: "Team Collaboration",
  },
  {
    src: "https://readdy.ai/api/search-image?query=A%2520professional%2520development%2520workshop%2520in%2520a%2520modern%2520training%2520room%2520with%2520Indian%2520financial%2520professionals%2520in%2520business%2520attire.%2520A%2520presenter%2520is%2520standing%2520near%2520a%2520screen%2520showing%2520investment%2520charts%2520while%2520team%2520members%2520are%2520seated%2520and%2520engaged%2520in%2520learning.%2520The%2520room%2520has%2520corporate%2520decor%2520with%2520navy%2520blue%2520and%2520gold%2520accents%2520and%2520professional%2520lighting.&width=600&height=400&seq=27&orientation=landscape",
    alt: "Professional Development",
  },
  {
    src: "https://readdy.ai/api/search-image?query=A%2520team-building%2520event%2520with%2520Indian%2520financial%2520professionals%2520in%2520smart%2520casual%2520attire%2520engaged%2520in%2520a%2520fun%2520activity%2520outdoors.%2520The%2520group%2520is%2520diverse%2520in%2520age%2520and%2520gender%252C%2520showing%2520camaraderie%2520and%2520teamwork.%2520The%2520setting%2520is%2520bright%2520with%2520natural%2520lighting%2520and%2520a%2520pleasant%2520outdoor%2520environment%2520like%2520a%2520corporate%2520retreat%2520venue.&width=600&height=400&seq=28&orientation=landscape",
    alt: "Team Building",
  },
  {
    src: "https://readdy.ai/api/search-image?query=A%2520modern%2520office%2520space%2520designed%2520for%2520a%2520financial%2520consultancy%2520firm%2520with%2520open%2520work%2520areas%2520and%2520collaborative%2520spaces.%2520The%2520decor%2520features%2520navy%2520blue%2520and%2520gold%2520accents%2520with%2520elegant%2520furnishings.%2520The%2520space%2520is%2520bright%2520with%2520natural%2520light%2520from%2520large%2520windows%2520showing%2520a%2520city%2520view.%2520A%2520few%2520Indian%2520professionals%2520in%2520business%2520attire%2520can%2520be%2520seen%2520working%2520at%2520desks%2520with%2520modern%2520technology.&width=600&height=400&seq=29&orientation=landscape",
    alt: "Modern Office Space",
  },
  {
    src: "https://readdy.ai/api/search-image?query=A%2520corporate%2520social%2520responsibility%2520event%2520with%2520Indian%2520financial%2520professionals%2520in%2520casual%2520company%2520t-shirts%2520participating%2520in%2520a%2520community%2520service%2520activity.%2520The%2520diverse%2520team%2520is%2520engaged%2520in%2520meaningful%2520volunteer%2520work%2520like%2520tree%2520planting%2520or%2520teaching%2520financial%2520literacy.%2520The%2520setting%2520is%2520bright%2520and%2520positive%2520with%2520natural%2520lighting.&width=600&height=400&seq=30&orientation=landscape",
    alt: "CSR Activities",
  },
  {
    src: "https://readdy.ai/api/search-image?query=A%2520celebration%2520or%2520award%2520ceremony%2520in%2520a%2520corporate%2520setting%2520with%2520Indian%2520financial%2520professionals%2520in%2520formal%2520business%2520attire.%2520A%2520team%2520member%2520is%2520receiving%2520an%2520award%2520or%2520recognition%2520while%2520colleagues%2520applaud.%2520The%2520venue%2520is%2520elegantly%2520decorated%2520with%2520navy%2520blue%2520and%2520gold%2520accents%252C%2520professional%2520lighting%252C%2520and%2520a%2520corporate%2520banner%2520visible.&width=600&height=400&seq=31&orientation=landscape",
    alt: "Recognition & Celebrations",
  },
];

const culturePoints = [
  {
    iconClass: "ri-team-line",
    title: "Collaborative Environment",
    description:
      "We foster open communication and teamwork, leveraging diverse perspectives to develop innovative investment solutions.",
  },
  {
    iconClass: "ri-book-open-line",
    title: "Continuous Learning",
    description:
      "We invest in our team's professional development through regular training, certifications, and industry conferences.",
  },
  {
    iconClass: "ri-heart-line",
    title: "Work-Life Balance",
    description:
      "We promote wellness initiatives and flexible work arrangements to ensure our team maintains a healthy work-life balance.",
  },
];

export default function TeamCulture() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subheading}>Our Culture</span>
          <h2 className={styles.title}>Life at VSpartans</h2>
          <p className={styles.description}>
            We foster a collaborative environment that encourages innovation,
            continuous learning, and professional growth while maintaining a
            healthy work-life balance.
          </p>
        </div>

        <div className={styles.grid}>
          {images.map(({ src, alt }, i) => (
            <div key={i} className={styles.card} >
              <img src={src} alt={alt} className={styles.image} />
            </div>
          ))}
        </div>

        <div className={styles.featuresGrid}>
          {culturePoints.map(({ iconClass, title, description }, i) => (
            <div key={i} className={styles.featureItem}>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDescription}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
