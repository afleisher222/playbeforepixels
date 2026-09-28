---
title: "Research hub verification queue (internal)"
meta_description: "Internal checklist of every source and fact that must be read against the original before any research hub page is published."
slug: "internal/research-hub/verification-queue"
last_reviewed: "2026-09-28"
publish: false
page_type: "internal-checklist"
sources:
  - citation: "All study pages in content/research-hub/studies/; library data in content/research-hub/_data/library.json"
---

# Verification queue (internal, never published)

**Status on 2026-09-28:** every source in the hub is **secondary-only**. PubMed, PMC, Crossref, doi.org, publisher sites, CDC, ed.gov, NHS and the AAP were blocked by the network proxy, and the session web-search budget (200/200) was spent. No page may be published until its sources are read (abstract at minimum).

**How to clear an item:** open the PubMed record or DOI; read the abstract (full text where available); correct the study page (numbers, authors, DOI/PMID, design, stance); change `what_we_read` in its front matter and the "What we read" section to `abstract` or `full-text`; remove [VERIFY] marks only for claims you confirmed; log the source in ops/RESEARCH-LOG.md; then update that source's row in `_data/library.json` and `library.md` (stance, one-line finding, citation status). If a claim cannot be confirmed, delete it rather than keep it.

## Priority 1: allowed-citation list (still unread in this review)

- [ ] **harle-2019**: Harlé B. Intensive early screen exposure as a causal factor for symptoms of autistic spectrum disorder: the case for «Virtual autism». Trends in Neuroscience and Education. 2019;17:100119. doi:10.1016/j.tine.2019.100119. PMID 31685125.  
  Check: https://doi.org/10.1016/j.tine.2019.100119
- [ ] **heffler-2020**: Heffler KF, Sienko DM, Subedi K, McCann KA, Bennett DS. Association of early-life social and digital media experiences with development of autism spectrum disorder-like symptoms. JAMA Pediatrics. 2020;174(7):690-696. doi:10.1001/jamapediatrics.2020.0230 [VERIFY]. PMID 32310265.  
  Check: https://pubmed.ncbi.nlm.nih.gov/32310265/
- [ ] **kushima-2022**: Kushima M, Kojima R, Shinohara R, et al.; Japan Environment and Children's Study Group. Association between screen time exposure in children at 1 year of age and autism spectrum disorder at 3 years of age: The Japan Environment and Children's Study. JAMA Pediatrics. 2022;176(4):384-391. doi:10.1001/jamapediatrics.2021.5778.  
  Check: https://doi.org/10.1001/jamapediatrics.2021.5778
- [ ] **takahashi-i-2023**: Takahashi I, Obara T, Ishikuro M, et al. Screen time at age 1 year and communication and problem-solving developmental delay at 2 and 4 years. JAMA Pediatrics. 2023;177(10):1039-1046. doi:10.1001/jamapediatrics.2023.3057. PMID 37603356 [VERIFY]. Full author list [VERIFY].  
  Check: https://doi.org/10.1001/jamapediatrics.2023.3057
- [ ] **brushe-2024**: Brushe ME, Haag DG, Melhuish EC, Reilly S, Gregory T. Screen time and parent-child talk when children are aged 12 to 36 months. JAMA Pediatrics. 2024;178(4):369-375. DOI [VERIFY]. Author list and title wording [VERIFY].  
  Check: https://jamanetwork.com/journals/jamapediatrics
- [ ] **madigan-2019**: Madigan S, Browne D, Racine N, Mori C, Tough S. Association between screen time and children's performance on a developmental screening test. JAMA Pediatrics. 2019;173(3):244-250. doi:10.1001/jamapediatrics.2018.5056 [VERIFY]. PMID 30688984 [VERIFY]. Author list [VERIFY].  
  Check: https://jamanetwork.com/journals/jamapediatrics/fullarticle/2722666
- [ ] **who-2019-under-5-guidelines**: World Health Organization. Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age. Geneva: WHO; 2019. ISBN 9789241550536 [VERIFY].  
  Check: https://www.who.int/publications/i/item/9789241550536
- [ ] **aap-2016-media-and-young-minds**: Council on Communications and Media, American Academy of Pediatrics. Media and young minds. Pediatrics. 2016;138(5):e20162591 [VERIFY]. doi:10.1542/peds.2016-2591 [VERIFY].  
  Check: https://publications.aap.org/pediatrics

## Priority 2: sources the pillar guide and FAQ lean on

- [ ] **ophir-2023-meta-analysis**: Ophir Y, Rosenberg H, Tikochinski R, Dalyot S, Lipshits-Braziler Y. Screen time and autism spectrum disorder: A systematic review and meta-analysis. JAMA Network Open. 2023;6(12):e2346775. doi:10.1001/jamanetworkopen.2023.46775. PMID 38064216 [VERIFY]. Author list [VERIFY].  
  Check: https://doi.org/10.1001/jamanetworkopen.2023.46775
- [ ] **lin-2025-lsac**: Lin P, Wu WT, Guo YL. Screen time before 2 years of age and risk of autism at 12 years of age. JAMA Pediatrics. 2025;179(1):90-91. Published online November 4, 2024. doi:10.1001/jamapediatrics.2024.4432. PMID 39495508.  
  Check: https://doi.org/10.1001/jamapediatrics.2024.4432
- [ ] **takahashi-n-2023-genetics**: Takahashi N, Tsuchiya KJ, et al. The association between screen time and genetic risks for neurodevelopmental disorders in children. Psychiatry Research. 2023;326:115305 [volume and article number VERIFY]. Full author list and DOI [VERIFY].  
  Check: https://www.sciencedirect.com/science/article/pii/S0165178123003451
- [ ] **melchior-2022-elfe**: Melchior M, Barry K, Cohen D, Plancoulaine S, Bernard JY, Milcent K, Gassama M, Gomajee R, Charles MA. TV, computer, tablet and smartphone use and autism spectrum disorder risk in early childhood: a nationally-representative study. BMC Public Health. 2022;22:865 [article number VERIFY]. doi:10.1186/s12889-022-13296-5. PMID 35490214.  
  Check: https://doi.org/10.1186/s12889-022-13296-5
- [ ] **cai-2025-mendelian-randomization**: Cai C, Ran Q, Lu M, Song C, Jiang Z. Leisure screen time and the risk of six neurodevelopmental disorders: A two-sample Mendelian randomization study. Brain and Behavior. 2025;15(9):e70884 [volume VERIFY]. Published September 21, 2025. doi:10.1002/brb3.70884. PMID 40977001 [VERIFY].  
  Check: https://doi.org/10.1002/brb3.70884
- [ ] **sundarimaa-2025-singapore**: Sundarimaa E, et al. Association between screen time exposure and scores on the Modified Checklist for Autism in Toddlers, Revised with Follow-Up (M-CHAT-R/F) in children from a multi-ethnic population-based sample in Singapore. Journal of Autism and Developmental Disorders. 2025. Volume and pages [VERIFY]. doi:10.1007/s10803-025-07066-6 [VERIFY]. PMID 41060496 [VERIFY].  
  Check: https://pubmed.ncbi.nlm.nih.gov/41060496/
- [ ] **liu-2025-meta-analysis**: Liu H, Zhu X, Ge B, Huang M, Li X. The association between screen exposure and autism spectrum disorder in children: meta-analysis. Reviews on Environmental Health. 2025;40(2):437-444. doi:10.1515/reveh-2024-0147. PMID 39733343.  
  Check: https://doi.org/10.1515/reveh-2024-0147
- [ ] **yuan-jadd-systematic-review**: Yuan G, Zhu Z, Guo H, et al. Screen time and autism spectrum disorder: A comprehensive systematic review of risk, usage, and addiction. Journal of Autism and Developmental Disorders. Online 2024; issue 2026 per one summary [VERIFY]. Volume and pages [VERIFY]. doi:10.1007/s10803-024-06665-z.  
  Check: https://doi.org/10.1007/s10803-024-06665-z
- [ ] **chonchaiya-2011**: Chonchaiya W, Nuntnarumit P, Pruksananonda C. Comparison of television viewing between children with autism spectrum disorder and controls. Acta Paediatrica. 2011;100(7):1033-1037. doi:10.1111/j.1651-2227.2011.02166.x. PMID 21244489.  
  Check: https://doi.org/10.1111/j.1651-2227.2011.02166.x
- [ ] **aap-2026-technical-report**: American Academy of Pediatrics. Digital ecosystems, children, and adolescents: Technical report. Pediatrics. 2026;157(2):e2025075321. Authors and DOI [VERIFY].  
  Check: https://pmc.ncbi.nlm.nih.gov/articles/PMC13139868/
- [ ] **aap-2026-digital-ecosystems**: American Academy of Pediatrics. Digital ecosystems, children, and adolescents: Policy statement. Pediatrics. 2026;157(2):e2025075320. Released January 20, 2026. Authors and DOI [VERIFY; likely doi:10.1542/peds.2025-075320].  
  Check: https://publications.aap.org/pediatrics/article/157/2/e2025075320/206129/Digital-Ecosystems-Children-and-Adolescents-Policy
- [ ] **zamfir-2018**: Zamfir MT. The consumption of virtual environment more than 4 hours/day, in the children between 0-3 years old, can cause a syndrome similar with the autism spectrum disorder. Journal of Romanian Literary Studies. 2018;(13). Pages [VERIFY]. No DOI located. [VERIFY]  
  Check: https://www.researchgate.net/publication/323748812
- [ ] **krijnen-2026-autism**: Krijnen LJG, Scheeren AM, van Asselt A, Begeer S, Plak RD. Why the term 'virtual autism' warrants caution. Autism. 2026 (online 2026; volume and pages [VERIFY]). doi:10.1177/13623613261434478. PMID 41871527 [VERIFY].  
  Check: https://doi.org/10.1177/13623613261434478
- [ ] **autismus-deutschland-statement**: Bundesverband autismus Deutschland e.V. "Virtueller Autismus" (Kontroverse Themen) [position statement]. Online, date [VERIFY].  
  Check: https://www.autismus.de/autismus/kontroverse-themen/virtueller-autismus.html
- [ ] **detroja-bhatia-2024**: Detroja S, Bhatia G. Early screen exposure and developmental abnormalities: Understanding the trepidations of "virtual autism". Indian Journal of Psychological Medicine. 2024 (online August 2024). Volume, issue and pages [VERIFY]. doi:10.1177/02537176241263310. PMID 39564297.  
  Check: https://doi.org/10.1177/02537176241263310
- [ ] **smc-2020-expert-reaction**: Science Media Centre (UK). Expert reaction to study looking at screen time in infants and autism spectrum disorder-like symptoms. April 2020. Comments include Dr Peter Etchells, Bath Spa University. [VERIFY quotes against the page]  
  Check: https://www.sciencemediacentre.org/expert-reaction-to-study-looking-at-screen-time-in-infants-and-autism-spectrum-disorder-like-symptoms/
- [ ] **hill-2024**: Hill MM, Gangi DN, Miller M. Toddler screen time: Longitudinal associations with autism and ADHD symptoms and developmental outcomes. Child Psychiatry & Human Development. Published online November 29, 2024. Volume and pages [VERIFY]. doi:10.1007/s10578-024-01785-0.  
  Check: https://doi.org/10.1007/s10578-024-01785-0
- [ ] **ozyazici-2026**: Ozyazici K. Screen time and autism-like symptoms in early childhood: Examining the concept of virtual autism. Acta Psychologica. 2026;268. Article number [VERIFY]. DOI [VERIFY].  
  Check: https://pubmed.ncbi.nlm.nih.gov/42320350/
- [ ] **madigan-2020-language-meta-analysis**: Madigan S, McArthur BA, Anhorn C, Eirich R, Christakis DA. Associations between screen use and child language skills: A systematic review and meta-analysis. JAMA Pediatrics. 2020;174(7):665-675. doi:10.1001/jamapediatrics.2020.0327. PMID 32202633.  
  Check: https://doi.org/10.1001/jamapediatrics.2020.0327
- [ ] **mallawaarachchi-2024-contexts**: Mallawaarachchi S, Burley J, Mavilidi M, Howard SJ, Straker L, Kervin L, et al., Cliff DP. Early childhood screen use contexts and cognitive and psychosocial outcomes: A systematic review and meta-analysis. JAMA Pediatrics. 2024;178(10):1017-1026. doi:10.1001/jamapediatrics.2024.2620. PMID 39102255. Full author list [VERIFY].  
  Check: https://doi.org/10.1001/jamapediatrics.2024.2620
- [ ] **zhang-2023-shared-genetic-risk**: Zhang Y, Choi KW, Delaney SW, Ge T, Pingault JB, Tiemeier H. Shared genetic risk in the association of screen time with psychiatric problems in children. JAMA Network Open. 2023;6(11). Article number [VERIFY; likely e2341502]. DOI [VERIFY].  
  Check: https://pmc.ncbi.nlm.nih.gov/articles/PMC10628728/

## Priority 3: everything else in the library

- [ ] **al-moussawi-2024-lebanon**: Al Moussawi I, Bendak L, Ziab H. "Virtual autism" and excessive screen exposure in children aged 0-3 years: A cross-sectional study in the Lebanese context. International Journal of Pediatrics and Adolescent Medicine. 2024;11(4):116-127. doi:10.4103/IJPAM.IJPAM_109_24.  
  Check: https://doi.org/10.4103/IJPAM.IJPAM_109_24
- [ ] **alper-2020-letter**: Alper M. Improving research on screen media, autism, and families of young children. JAMA Pediatrics. 2020;174(12):1223. Reply: Heffler KF, Bennett DS, Subedi K. JAMA Pediatrics. 2020;174(12):1223-1224.  
  Check: https://pubmed.ncbi.nlm.nih.gov/33165522/
- [ ] **alrahili-2021**: Alrahili N, Almarshad NA, Alturki RY, Alothaim JS, Altameem RM, Alghufaili MA, Alghamdi AA, Alageel AA. The association between screen time exposure and autism spectrum disorder-like symptoms in children. Cureus. 2021;13(10):e18787. DOI [VERIFY].  
  Check: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8592297/
- [ ] **apims-2023-pakistan**: [Authors VERIFY]. The outcome of early intervention in children with virtual autism spectrum disorders on the basis of ADOS. Annals of PIMS – Shaheed Zulfiqar Ali Bhutto Medical University. 2023;19(2):176-180. doi:10.48036/apims.v19i2.899.  
  Check: https://doi.org/10.48036/apims.v19i2.899
- [ ] **authorea-2025-preprint**: [Authors VERIFY]. Decoding virtual autism: Understanding behavioral shifts in children amidst digital exposure. Authorea preprint. 2025. doi:10.22541/au.174325875.50173092/v1.  
  Check: https://doi.org/10.22541/au.174325875.50173092/v1
- [ ] **basaran-sanal-otizm**: Başaran M. Sanal otizm: Erken çocuklukta aşırı ekran maruziyetinin gelişimsel bir riski [Virtual autism: a developmental risk of excessive screen exposure in early childhood]. Mevzu – Sosyal Bilimler Dergisi. Year, volume and pages [VERIFY].  
  Check: https://dergipark.org.tr/en/pub/mevzu/article/1738377
- [ ] **chen-2020-mediation**: Chen JY, Strodl E, Huang LH, Chen YJ, Yang GY, Chen WQ. Early electronic screen exposure and autistic-like behaviors among preschoolers: The mediating role of caregiver-child interaction, sleep duration and outdoor activities. Children (Basel). 2020;7(11):200. doi:10.3390/children7110200.  
  Check: https://doi.org/10.3390/children7110200
- [ ] **chen-2021-longhua**: Chen JY, Strodl E, Wu CA, Huang LH, Yin XN, Wen GM, Sun DL, Xian DX, Chen YJ, Yang GY, Chen WQ. Screen time and autistic-like behaviors among preschool children in China. Psychology, Health & Medicine. 2021;26(5):607-620. doi:10.1080/13548506.2020.1851034. PMID 33227216 [VERIFY].  
  Check: https://doi.org/10.1080/13548506.2020.1851034
- [ ] **devenir-2020-epee**: [Author(s) VERIFY; attributed to Bossière MC in earlier notes]. L'exposition précoce et excessive aux écrans (EPEE) : un nouveau syndrome [Early and excessive screen exposure (EPEE): a new syndrome]. Devenir. 2020;32(2):119-137. DOI [VERIFY].  
  Check: https://shs.cairn.info/revue-devenir-2020-2-page-119?lang=fr
- [ ] **dhungel-2026**: Dhungel O, Pokhrel M, Karki U. Screen-induced developmental deviation is not autism: Recalibrating virtual autism. Journal of Nepal Medical Association. 2026;64(297). Pages [VERIFY]. DOI [VERIFY; two candidate DOIs appeared in search results].  
  Check: https://www.jnma.com.np/
- [ ] **dong-2021**: Dong HY, et al. Screen time and autism: Current situation and risk factors for screen time among pre-school children with ASD. Frontiers in Psychiatry. 2021;12:675902. doi:10.3389/fpsyt.2021.675902. Author list [VERIFY].  
  Check: https://doi.org/10.3389/fpsyt.2021.675902
- [ ] **dunckley-electronic-screen-syndrome**: Dunckley VL. Reset Your Child's Brain: A Four-Week Plan to End Meltdowns, Raise Grades, and Boost Social Skills by Reversing the Effects of Electronic Screen-Time. Novato, CA: New World Library [publisher VERIFY]; 2015. Also: Dunckley VL. Electronic screen syndrome: Prevention and treatment. Book chapter, Springer Publishing Company (APA PsycNET record 2017-31720-012) [book title, editors and year VERIFY].  
  Check: https://psycnet.apa.org/record/2017-31720-012
- [ ] **ecrans-et-autisme-2017-handout**: [Author VERIFY; widely attributed to Ducanda AL]. Écrans et autisme [Screens and autism]. Continuing-education document hosted by the Association Française de Pédiatrie Ambulatoire (AFPA), 2017. [VERIFY]  
  Check: https://afpa.org/content/uploads/2017/06/ecran-et-autisme-FMC.pdf
- [ ] **ejcm-2025-case-control**: [Authors VERIFY]. Are screens stealing childhood? Exploring the link between digital exposure and autism-like symptoms in children aged 1-4 years. European Journal of Cardiovascular Medicine. 2025;15(3):696-701. [VERIFY]  
  Check: https://healthcare-bulletin.co.uk/article/are-screens-stealing-childhood-exploring-the-link-between-digital-exposure-and-autism-like-symptoms-in-children-aged-1-4-years-3019/
- [ ] **garg-2024**: Garg RK, Garg P, Sharma P, Kumar Y, Niwas R, Singh J, Singh S. Virtual autism among children: A leading hazard of gadget exposure and preventive measures. Journal of Education and Health Promotion. 2024;13:76. doi:10.4103/jehp.jehp_1482_23.  
  Check: https://doi.org/10.4103/jehp.jehp_1482_23
- [ ] **georgia-2025-bmc-pediatrics**: [Authors VERIFY]. Does early screentime exposure or duration affect M-CHAT-R autism screening tool score? BMC Pediatrics. 2025;25. Article number [VERIFY]. doi:10.1186/s12887-025-06405-x. PMID 41382300.  
  Check: https://doi.org/10.1186/s12887-025-06405-x
- [ ] **georgia-2026-cross-sectional**: [Authors VERIFY]. Screen time and autism like behavior: Cross-sectional study from Georgia. [Journal VERIFY]. 2026. PMID 42233166.  
  Check: https://pubmed.ncbi.nlm.nih.gov/42233166/
- [ ] **heffler-2022-case-report**: Heffler KF, Frome LR, Gullo DF. Changes in autism symptoms associated with screen exposure: Case report of two young children. Psychiatry Research Case Reports. 2022;1:100059. Issue and DOI [VERIFY].  
  Check: https://www.sciencedirect.com/science/article/pii/S2773021222000529
- [ ] **heffler-2024-sensory**: Heffler KF, Acharya B, Subedi K, Bennett DS. Early-life digital media experiences and development of atypical sensory processing. JAMA Pediatrics. 2024;178(3):266-273. doi:10.1001/jamapediatrics.2023.5923. PMID 38190175.  
  Check: https://doi.org/10.1001/jamapediatrics.2023.5923
- [ ] **heffler-oestreicher-2016**: Heffler KF, Oestreicher LM. Causation model of autism: Audiovisual brain specialization in infancy competes with social brain networks. Medical Hypotheses. 2016;91:114-122. DOI [VERIFY]. PMID 26146132 [VERIFY].  
  Check: https://www.sciencedirect.com/science/article/pii/S0306987715002388
- [ ] **hermawati-2018**: Hermawati D, Rahmadi FA, Sumekar TA, Winarni TI. Early electronic screen exposure and autistic-like symptoms. Intractable & Rare Diseases Research. 2018;7(1):69-71. doi:10.5582/irdr.2018.01007 [VERIFY]. PMID 29552452.  
  Check: https://pubmed.ncbi.nlm.nih.gov/29552452/
- [ ] **hill-2020**: Hill MM, Gangi D, Miller M, Rafi SM, Ozonoff S. Screen time in 36-month-olds at increased likelihood for ASD and ADHD. Infant Behavior and Development. 2020;61:101484. DOI [VERIFY]. PMID 32871326 [VERIFY].  
  Check: https://pubmed.ncbi.nlm.nih.gov/32871326/
- [ ] **lin-yh-2022-screen-timing-letter**: Lin YH, Lin SH, Gau SSF. Screen timing may be more likely than screen time to be associated with the risk of autism spectrum disorder [letter]. JAMA Pediatrics. 2022;176(8) [issue and pages VERIFY]. Reply by Kushima M et al., doi:10.1001/jamapediatrics.2022.1513.  
  Check: https://pubmed.ncbi.nlm.nih.gov/35604677/
- [ ] **lsac-2026-trajectories**: [Authors VERIFY]. Early screen time and behavioral symptom trajectories in children with autism and ADHD: A longitudinal cohort study. Journal of Autism and Developmental Disorders. 2026. Volume and pages [VERIFY]. doi:10.1007/s10803-026-07469-z. PMID 42545633.  
  Check: https://doi.org/10.1007/s10803-026-07469-z
- [ ] **marcelli-2018-epee**: Marcelli D, Bossière MC, Ducanda AL. Plaidoyer pour un nouveau syndrome « Exposition précoce et excessive aux écrans » (EPEE) [A plea for a new syndrome: early and excessive screen exposure]. Enfances & Psy. 2018;79(3):142-160. DOI [VERIFY].  
  Check: https://www.cairn.info/revue-enfances-et-psy-2018-3-page-142.htm
- [ ] **mohamed-2023-digital-detox**: Mohamed SM, et al. Effect of digital detox program on electronic screen syndrome among preparatory school students. Nursing Open. 2023;10(4):2222-2228. doi:10.1002/nop2.1472. PMID 36373487.  
  Check: https://doi.org/10.1002/nop2.1472
- [ ] **moktan-2022-nepal**: Moktan S, et al. Rising trend in screen time and associated autism-like symptoms in the digital age of COVID-19 pandemic. Journal of Psychiatrists' Association of Nepal. 2022;11(1). Full author list, pages and DOI [VERIFY].  
  Check: https://www.researchgate.net/publication/369802849
- [ ] **montes-2016**: Montes G. Children with autism spectrum disorder and screen time: Results from a large, nationally representative US study. Academic Pediatrics. 2016;16(2):122-128. doi:10.1016/j.acap.2015.08.007. Issue [VERIFY].  
  Check: https://doi.org/10.1016/j.acap.2015.08.007
- [ ] **pliska-2025-parents**: Pliska [first names VERIFY], Kunina-Habenicht O, Ritterfeld U. Media use among children with ASD: Perspectives and concerns of parents. PLOS One. 2025;20(10):e0332504. doi:10.1371/journal.pone.0332504.  
  Check: https://doi.org/10.1371/journal.pone.0332504
- [ ] **pouretemad-2022-pdnas**: Pouretemad HR, Sadeghi S, Badv RS, Brand S. Differentiating Post-Digital Nannying Autism Syndrome from Autism Spectrum Disorders in Young Children: A Comparative Cross-Sectional Study. Journal of Clinical Medicine. 2022;11(22):6786. doi:10.3390/jcm11226786 [VERIFY]. PMID 36431264 [VERIFY].  
  Check: https://doi.org/10.3390/jcm11226786
- [ ] **psihologia-ro-critique**: Psihologia.ro. Adevărul despre autismul virtual [The truth about virtual autism]. Online article. Author and date [VERIFY].  
  Check: https://psihologia.ro/noutati-din-psihologie/adevarul-despre-autismul-virtual/
- [ ] **psychologiescientifique-critique**: psychologiescientifique.org (forum, 'Billets libres'). « Écrans et autisme : l'alerte virale et sans fondement scientifique » [Screens and autism: the viral alert without scientific foundation]. Online post, c. 2017-2018. Author, publisher and date [VERIFY].  
  Check: https://psychologiescientifique.org/forum/billets-libres/ecrans-et-autisme-lalerte-virale-et-sans-fondement-scientifique/
- [ ] **rangaraj-2026**: Rangaraj S, Sundar S, Alagesan K, et al. Early life screen exposure characteristics and risk of autism spectrum disorder: A multivariable analysis in a case-control study. Indian Journal of Pediatrics. 2026. Volume and pages [VERIFY]. doi:10.1007/s12098-025-05955-3. PMID 41511623.  
  Check: https://doi.org/10.1007/s12098-025-05955-3
- [ ] **sadeghi-2021-parent-child-interaction**: Sadeghi S, Pouretemad HR, Khosrowabadi R, Fathabadi J, Nikbakht S. Parent-child interaction effects on autism symptoms and EEG relative power in young children with excessive screen-time. Early Child Development and Care. 2021;191(6):827-836. doi:10.1080/03004430.2019.1649256. Companion: Behavioral and electrophysiological evidence for parent training in young children with autism symptoms and excessive screen-time. Asian Journal of Psychiatry. 2019;45 [pages VERIFY].  
  Check: https://doi.org/10.1080/03004430.2019.1649256
- [ ] **sadeghi-2023-severity**: Sadeghi S, Pouretemad HR, Badv RS, Brand S. Associations between symptom severity of autism spectrum disorder and screen time among toddlers aged 16 to 36 months. Behavioral Sciences (Basel). 2023;13(3):208. doi:10.3390/bs13030208. PMID 36975233.  
  Check: https://doi.org/10.3390/bs13030208
- [ ] **sarfraz-2023-systematic-review**: Sarfraz S, Shlaghya G, Narayana SH, Mushtaq U, Shaman Ameen B, Nie C, Nechi D, Mazhar IJ, Yasir M, Arcia Franchini AP. Early screen-time exposure and its association with risk of developing autism spectrum disorder: A systematic review. Cureus. 2023;15(7):e42292. PMID 37614255.  
  Check: https://pubmed.ncbi.nlm.nih.gov/37614255/
- [ ] **screen-use-language-5-to-7**: [Authors, journal and year VERIFY]. Screen use and children's language development from ages 5 to 7 years. PMID 42606877.  
  Check: https://pubmed.ncbi.nlm.nih.gov/42606877/
- [ ] **slobodin-2019-review**: Slobodin O, Heffler KF, Davidovitch M. Screen media and autism spectrum disorder: A systematic literature review. Journal of Developmental & Behavioral Pediatrics. 2019;40(4). Pages [VERIFY]. doi:10.1097/DBP.0000000000000654. PMID 30908423.  
  Check: https://doi.org/10.1097/DBP.0000000000000654
- [ ] **spitzer-2023**: Spitzer M. Babys und Bildschirme: Realer oder virtueller Autismus? [Babies and screens: real or virtual autism?]. Nervenheilkunde. 2023;42:332-341. doi:10.1055/a-2022-0301.  
  Check: https://doi.org/10.1055/a-2022-0301
- [ ] **takahashi-i-2024-genetic-risk-letter**: Role of genetic risk in the association between screen time and child development [letter and reply]. JAMA Pediatrics. 2024;178(3):317-318 [VERIFY]. doi:10.1001/jamapediatrics.2023.6106. Search summaries credit Takahashi I, Obara T and Kuriyama S; whether this is the letter or the reply, and who wrote the letter, is [VERIFY].  
  Check: https://doi.org/10.1001/jamapediatrics.2023.6106
- [ ] **tunisia-2025-screen-patterns**: [Authors VERIFY]. Patterns of early exposure to screens by children with ASD. Discover Mental Health. 2025;5(1):211. doi:10.1007/s44192-025-00318-y. PMID 41467923 [VERIFY].  
  Check: https://doi.org/10.1007/s44192-025-00318-y
- [ ] **van-asselt-2026**: van Asselt A. Beyond screen time: A neurodiversity-affirmative research agenda for screen use in autism. Autism in Adulthood [journal VERIFY; inferred from the DOI prefix]. 2026. doi:10.1177/25739581261452097.  
  Check: https://doi.org/10.1177/25739581261452097
- [ ] **vanderloo-2025-disabilities**: Vanderloo LM, et al. Screen time among children and youth with disabilities: A systematic review and meta-analysis. Child: Care, Health and Development. 2025. Volume [VERIFY]. doi:10.1111/cch.70136. Author list [VERIFY].  
  Check: https://doi.org/10.1111/cch.70136
- [ ] **waldman-2008**: Waldman M, Nicholson S, Adilov N, Williams J. Autism prevalence and precipitation rates in California, Oregon, and Washington counties. Archives of Pediatrics & Adolescent Medicine. 2008;162(11). Pages, DOI and PMID [VERIFY]. Precursor: Waldman M, Nicholson S, Adilov N. NBER Working Paper 12632 (2006). Critique: 'Autism prevalence and precipitation: the potential for cross-level bias', PMID 19414703.  
  Check: https://pubmed.ncbi.nlm.nih.gov/19414703/
- [ ] **yamamoto-2023-jecs**: Yamamoto M, Mezawa H, Sakurai K, Mori C; Japan Environment and Children's Study Group. Screen time and developmental performance among children at 1-3 years of age in the Japan Environment and Children's Study. JAMA Pediatrics. 2023;177(11):1168-1175. doi:10.1001/jamapediatrics.2023.3643. Correction to Key Points: JAMA Pediatrics 2024 (PMID 38252449 [VERIFY]).  
  Check: https://doi.org/10.1001/jamapediatrics.2023.3643
- [ ] **zamfir-2018-romanian-essays**: Zamfir MT. O altă formă de autism – autismul virtual [Another form of autism – virtual autism]. 2018. Venue [VERIFY]. Related texts by the same author: 'Virtual autism and its effects on the child's evolution' (ResearchGate 326898530; Romanian version in iTeach: Experiențe didactice) and a 2018 master's dissertation (ResearchGate 326913504). [VERIFY]  
  Check: https://www.researchgate.net/publication/323425282

## Specific open questions from the fact-check passes

- [ ] Ophir 2023: the bias-corrected effect size, and the corrected estimate for children only.
- [ ] Kushima 2022: how autism was ascertained (parent report of a physician diagnosis?), number of autistic children, PMID.
- [ ] Lin 2025: how autism was ascertained; confirm 145 cases.
- [ ] Takahashi N 2023: full citation (volume 326, article 115305?), DOI, and the odds ratios reported in the press.
- [ ] Sundarimaa 2025: OR 1.24, its CI and adjustment set; DOI and PMID.
- [ ] Liu 2025: units of the weighted mean difference; pooled OR; bias handling.
- [ ] Yuan (JADD): publication-bias handling; final volume and pages.
- [ ] Chonchaiya 2011: direction of the co-viewing finding.
- [ ] Alrahili 2021: the actual result (our two passes disagree).
- [ ] Chen 2020: the mediation percentages (5.3%, 1.2%) conflict between passes.
- [ ] Hill 2020: whether the autism group differed in screen time.
- [ ] Zamfir 2018: pages, and the efficiency figures (secondary sources conflict: quote none until the PDF is read).
- [ ] Harlé 2019: exact abstract wording quoted on the page.
- [ ] Brushe 2024: DOI, author list, sample size, and how the daily totals were derived.
- [ ] Madigan 2019: every number (sample, direction, effect sizes). Only the title was confirmed.
- [ ] WHO 2019: whether sedentary screen time is also not recommended at age 1; "less is better" wording; certainty of evidence.
- [ ] AAP 2016: every recommendation quoted (under 18 months, video chat exception, 18-24 months, 2-5 years).
- [ ] AAP 2026: read the policy statement and technical report (PMC13139868). If they replace the 2016 guidance, update index.md, faq.md (Q17, Q18) and the study pages, and ask the owner to update BRAND.md rule 5 (this session did not edit BRAND.md).
- [ ] Detroja 2024, Krijnen 2026, van Asselt 2026, Dhungel 2026: volume/pages, DOIs, and that each argument we attribute is in the text.
- [ ] Science Media Centre 2020: the Etchells quote and the "yes/no" description of the exposure measure.
- [ ] psychologiescientifique.org and psihologia.ro: author, date, and the specific arguments.
- [ ] autismus Deutschland: date and wording of the position statement.
- [ ] Alper 2020: read the letter before attributing any argument; confirm which PMID is the letter and which the reply.
- [ ] 2024 genetic-risk letter (doi:10.1001/jamapediatrics.2023.6106): authorship and content.

## Non-study facts on the hub that need an official source

- [ ] US early intervention (IDEA Part C): self-referral, free evaluation, 45-day timeline, IFSP, cost rules and no refusal for inability to pay (34 CFR Part 303). Source: sites.ed.gov/idea.
- [ ] US ages 3+: free evaluation through the public school district (IDEA Part B, section 619); transition planning before age 3; IEP.
- [ ] National directories: CDC "Learn the Signs. Act Early." state contacts; ECTA Center Part C coordinators; Center for Parent Information and Resources (Parent Training and Information Centers).
- [ ] AAP developmental screening schedule and autism screening at 18 and 24 months (early-intervention.md).
- [ ] UK: Healthy Child Programme review at 2 to 2.5 years; self-referral to speech and language services; England SEND Local Offer; devolved nations.
- [ ] Canada: provincial and territorial preschool speech-language and early-years services and self-referral.
- [ ] Australia: NDIS early childhood approach, current age range, and no diagnosis needed; state child health nurse services.
- [ ] Definitional statements: "autism is a lifelong neurodevelopmental difference" and "virtual autism is not in the ICD or DSM". Cite WHO ICD-11 and DSM-5-TR (or a national guideline) before publishing.
- [ ] Instrument descriptions in glossary.md (M-CHAT-R/F, ADOS, CARS, SCQ, ASQ-3).
- [ ] Reply-time wording ("[5] business days") matches ops/COMPLIANCE-GATE.md item 21 and how the routine actually runs.

## Autistic perspectives (added by the respect and inclusion review, 2026-09-28)

- [ ] Search systematically for research by autistic authors and statements from autistic-led organizations on screens, media use and the "virtual autism" label (English, French, German, Romanian, Spanish, Portuguese). Add each with a study page and give it the same care as clinical studies.
- [ ] Krijnen 2026 and van Asselt 2026: confirm from the paper itself that the author (van Asselt) is autistic and writes from lived experience, as index.md, faq.md (Q23) and both study pages say. If it cannot be confirmed, remove the claim.
- [ ] Glossary entries "Autistic traits", "'Severity' scores" and "'Risk' and 'likelihood'" are editorial definitions; have the paid autistic sensitivity reader and the clinician reviewer check them.

## Leads not yet entered (from the fact-check passes)

See the "Leads we have seen but not yet added" section of library.md, plus the language, video-deficit, guideline and intervention re-verify queue in the literature lane notes (Christakis 2009; Zimmerman 2007/2009; Tomopoulos 2010; Schmidt 2009 Project Viva; Przybylski & Weinstein 2019; Stiglic & Viner 2019; Taylor, Monaghan & Westermann 2018; Strouse & Samson 2021; Kuhl 2003; DeLoache 2010; Ferjan Ramirez 2020; Canada and Australia 24-hour guidelines 2017; CPS 2017; SCREENS trial 2022; Schmidt-Persson 2024; and others). Null and balancing studies first.
