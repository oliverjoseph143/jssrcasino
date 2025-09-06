 import React, { useState } from "react";
 import "./faq.css";
 import Float32 from "../asserts/faq.jpg";
 
 const FAQ_SECTIONS = {
   General: [
     "Why Good Luck Casino?",
     "What type of games does Goodluck offer?",
     "Can I play Goodluck for free?",
     "My game isn’t loading. What should I do?",
   ],
   "Registration and Login": [
     "How do I register on Good Luck Casino?",
     "I forgot my password. What should I do?",
   ],
   "Account and Verification": [
     "What is KYC?",
     "Why do I need to verify my identity?",
   ],
   "Responsible Gaming": [
     "How do I stop gambling on Good Luck Casino?",
     "How can I recognize a gambling problem?",
   ],
   Banking: [
     "What payment methods do you accept?",
     "How long do DepositPages take?",
   ],
   Promotions: [
     "Where can I see active promotions?",
     "How do I use a bonus?",
   ],
   "Privacy & Security": [
     "Is Goodluck secure?",
     "Are Goodluck's games fair?",
     "Does Goodluck use cookies?",
     "What is my personal information used for?",
   ],
   "Jet Privilege Program": ["What is the Jet Privilege Program?"],
 };
 export default function Faq() {
   const [openItemKey, setOpenItemKey] = useState(null);
 
   const makeItemKey = (section, index) => `${section}-${index}`;
   const toggleItem = (key) => {
     setOpenItemKey((prev) => (prev === key ? null : key));
   };
   const QuestionRow = (section, question, i) => {
     const key = makeItemKey(section, i);
     const isOpen = openItemKey === key;
     return (
       <li key={key} className={`faq__item ${isOpen ? "open" : ""}`}>
         <button
           type="button"
           id={`question-${key}`}
           className="faq__question"
           onClick={() => toggleItem(key)}
           aria-expanded={isOpen}
           aria-controls={`answer-${key}`}
         >
           <span className="faq__q-text">{question}</span>
           <span className="faq__icon" aria-hidden="true">
             {isOpen ? "−" : "+"}
           </span>
         </button>
         {isOpen && (
           <div
             id={`answer-${key}`}
             className="faq__answer"
             role="region"
             aria-labelledby={`question-${key}`}
           >
             <p>
               🎲 This is a sample answer for “{question}”. Replace this with
               your real content to guide players. 🍀
             </p>
           </div>
         )}
       </li>
     );
   };
 
   return (
     <div
       className="faq"
       style={{ backgroundImage: `url(${Float32})`, backgroundSize: "fixed" }}
     >
       <div className="faq__overlay">
         <h2 className="faq__title"> Frequently Asked Questions (FAQs) </h2>
         <div className="faq__columns">
           {Object.entries(FAQ_SECTIONS).map(([section, questions]) => (
             <section className="faq__column" key={section}>
               <h3 className="faq__section">{section}</h3>
               <ul className="faq__list">
                 {questions.map((q, i) => QuestionRow(section, q, i))}
               </ul>
             </section>
           ))}
         </div>
       </div>
     </div>
   );
 }
 