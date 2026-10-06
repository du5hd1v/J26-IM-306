# J26-IM-306

# Kadhai (கதை) — Interactive Storytelling and Cultural Identity among Sri Lankan Tamils

**Project ID:** J26-IM-306  
**Degree Program:** B.Sc. (Hons) Information Technology, Specialization in Interactive Multi Media  
**Supervisor:** Ishara Gamage  

---

## Overview

**Kadhai** is an empirical research initiative and web-based interactive digital storybook platform dedicated to preserving and retelling Jaffna's historical and Hindu cultural heritage. While traditional archives and monuments preserve historical records, younger generations and diaspora communities often lack access to engaging, contemporary digital formats. 

Kadhai addresses this gap by investigating how digital presentation modalities (interactive vs. linear, comic-panel vs. high-motion, traditional iconographic vs. contemporary superhero-style, and audio-narration layers) influence **Perceived Cultural Identity**, **Perceived Cultural Relevance**, **Narrative Immersion**, and **Historical Content Recall** between local residents and the Tamil diaspora.

---

## Experimental Architecture: Dual Storytelling Paths

Participants are randomly assigned to one of two parallel storytelling paths traversing four distinct segments:

| Segment / Focus | Component Lead | Path A (Traditional Baseline) | Path B (Contemporary Treatment) |
|---|---|---|---|
| **C1: Interactive Narrative** | W.A.D.D. Rathnayake | Simple, linear fixed-sequence intro | Gamified, interactive intro with branching choices |
| **C2: Character Visual Style** | Jathurshan P. | Traditional iconographic King Sangiliyan | Contemporary superhero-style King Sangiliyan |
| **C3: Animation Motion Intensity** | Thiveesan K. | Low-motion, comic-panel style | Dynamic, high-motion animation |
| **C4: Audio, Narration & Feedback** | Sudusinghe J.J. | Visual-only (no audio/narration) | Bilingual (Tamil/English) narration + audio + feedback |

---

## System Architecture

```text
               +-------------------------------------------------------+
               |         Researched Jaffna Historical & Hindu          |
               |                     Narrative Content                 |
               +-------------------------------------------------------+
                                           |
                                           v
+-------------------------------------------------------------------------------------+
|                              Kadhai Web Client Layer                                |
|  +--------------------+  +--------------------+  +---------------+  +------------+  |
|  | C1: Interaction    |  | C2: Character      |  | C3: Animation |  | C4: Audio  |  |
|  | Engine & Branching |  | Visual Styles      |  | Motion Engine |  | & Narration|  |
|  +--------------------+  +--------------------+  +---------------+  +------------+  |
+-------------------------------------------------------------------------------------+
                                           |
                 +-------------------------+-------------------------+
                 |                                                   |
                 v                                                   v
     [ Path A: Traditional ]                             [ Path B: Contemporary ]
   - Linear Storyline                                  - Gamified Branching Choices
   - Iconographic Character Art                        - Superhero Aesthetic Character Art
   - Low-Motion Comic Panels                           - High-Motion Dynamic Animation
   - Visual Only                                       - Bilingual Narration & Audio Feedback
                 |                                                   |
                 +-------------------------+-------------------------+
                                           |
                                           v
+-------------------------------------------------------------------------------------+
|                      Shared Evaluation & Measurement Engine                         |
|  - Pre-Survey (MEIM-R / CHAS)                                                        |
|  - Per-Segment Checkpoints (Micro-surveys)                                          |
|  - Post-Survey (Recall Quiz + Identity / Engagement Analysis)                        |
|  - Anonymized Data Collector (Factorial ANOVA / Jamovi / SPSS)                       |
+-------------------------------------------------------------------------------------+
