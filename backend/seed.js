const mongoose = require('mongoose');
const Interaction = require('./models/interaction');

const interactions = [
  {
    drug_1: "Warfarin",
    drug_2: "Aspirin",
    interaction: "Combined use increases risk of bleeding. These medications are blood thinners and their effects can be additive.",
    severity: "High",
    mechanism: "Both drugs interfere with blood clotting through different mechanisms",
    recommendations: "Avoid combination unless specifically directed by healthcare provider. Regular monitoring of INR required."
  },
  {
    drug_1: "Simvastatin",
    drug_2: "Gemfibrozil",
    interaction: "Increased risk of severe muscle damage (rhabdomyolysis) when these cholesterol medications are combined.",
    severity: "High",
    mechanism: "Gemfibrozil increases blood levels of simvastatin by reducing its breakdown",
    recommendations: "Avoid combination. Consider alternative cholesterol-lowering strategies."
  },
  {
    drug_1: "Clarithromycin",
    drug_2: "Atorvastatin",
    interaction: "Risk of muscle damage and kidney problems due to increased statin levels.",
    severity: "High",
    mechanism: "Clarithromycin inhibits the enzyme that breaks down atorvastatin",
    recommendations: "Temporarily suspend atorvastatin during clarithromycin treatment."
  },
  {
    drug_1: "Metformin",
    drug_2: "Iodinated Contrast",
    interaction: "Risk of lactic acidosis, especially in patients with kidney problems.",
    severity: "High",
    mechanism: "Contrast dye can temporarily impair kidney function, leading to metformin accumulation",
    recommendations: "Stop metformin 48 hours before and after contrast administration."
  },
  {
    drug_1: "Amiodarone",
    drug_2: "Warfarin",
    interaction: "Significantly increased anticoagulant effect and bleeding risk.",
    severity: "High",
    mechanism: "Amiodarone inhibits warfarin metabolism in the liver",
    recommendations: "Reduce warfarin dose by 30-50% and monitor INR closely."
  },
  {
    drug_1: "Fluoxetine",
    drug_2: "Tramadol",
    interaction: "Increased risk of serotonin syndrome and reduced pain relief.",
    severity: "High",
    mechanism: "Both drugs affect serotonin levels and fluoxetine inhibits tramadol activation",
    recommendations: "Consider alternative pain medication or antidepressant."
  },
  {
    drug_1: "ACE Inhibitors",
    drug_2: "Potassium Supplements",
    interaction: "Risk of dangerous elevation in blood potassium levels.",
    severity: "High",
    mechanism: "ACE inhibitors reduce potassium excretion by the kidneys",
    recommendations: "Monitor potassium levels closely if combination necessary."
  },
  {
    drug_1: "Carbamazepine",
    drug_2: "Oral Contraceptives",
    interaction: "Reduced effectiveness of birth control pills.",
    severity: "High",
    mechanism: "Carbamazepine induces liver enzymes that break down contraceptive hormones",
    recommendations: "Use alternative or additional birth control methods."
  },
  {
    drug_1: "Sildenafil",
    drug_2: "Nitrates",
    interaction: "Severe drop in blood pressure that can be life-threatening.",
    severity: "High",
    mechanism: "Both medications cause blood vessel dilation",
    recommendations: "Never use these medications together."
  },
  {
    drug_1: "Lithium",
    drug_2: "NSAIDs",
    interaction: "Increased lithium levels and risk of toxicity.",
    severity: "High",
    mechanism: "NSAIDs reduce lithium excretion by the kidneys",
    recommendations: "Monitor lithium levels closely if combination needed."
  },
  {
    drug_1: "Methotrexate",
    drug_2: "Trimethoprim",
    interaction: "Increased methotrexate toxicity risk.",
    severity: "High",
    mechanism: "Both drugs affect folate metabolism",
    recommendations: "Avoid combination when possible."
  },
  {
    drug_1: "Verapamil",
    drug_2: "Beta Blockers",
    interaction: "Risk of heart block and severe bradycardia.",
    severity: "Moderate",
    mechanism: "Additive effects on heart conduction system",
    recommendations: "Monitor heart rate and ECG if combination necessary."
  },
  {
    drug_1: "Digoxin",
    drug_2: "Amiodarone",
    interaction: "Increased digoxin levels and risk of toxicity.",
    severity: "Moderate",
    mechanism: "Amiodarone reduces digoxin elimination",
    recommendations: "Reduce digoxin dose and monitor levels."
  },
  {
    drug_1: "Theophylline",
    drug_2: "Ciprofloxacin",
    interaction: "Increased theophylline levels and risk of side effects.",
    severity: "Moderate",
    mechanism: "Ciprofloxacin inhibits theophylline metabolism",
    recommendations: "Monitor theophylline levels and adjust dose if needed."
  },
  {
    drug_1: "Prednisone",
    drug_2: "NSAIDs",
    interaction: "Increased risk of gastrointestinal bleeding.",
    severity: "Moderate",
    mechanism: "Both medications can irritate the stomach lining",
    recommendations: "Consider adding stomach protection medication."
  },
  {
    drug_1: "Metronidazole",
    drug_2: "Alcohol",
    interaction: "Severe nausea and vomiting (disulfiram-like reaction).",
    severity: "Moderate",
    mechanism: "Metronidazole interferes with alcohol metabolism",
    recommendations: "Avoid alcohol during and 48 hours after treatment."
  },
  {
    drug_1: "Levothyroxine",
    drug_2: "Calcium Supplements",
    interaction: "Reduced thyroid hormone absorption.",
    severity: "Moderate",
    mechanism: "Calcium binds to thyroid hormone in gut",
    recommendations: "Take medications at least 4 hours apart."
  },
  {
    drug_1: "Omeprazole",
    drug_2: "Clopidogrel",
    interaction: "Reduced antiplatelet effect of clopidogrel.",
    severity: "Moderate",
    mechanism: "Omeprazole inhibits activation of clopidogrel",
    recommendations: "Consider using alternative acid reducer."
  },
  {
    drug_1: "Spironolactone",
    drug_2: "Lisinopril",
    interaction: "Risk of high potassium levels.",
    severity: "Moderate",
    mechanism: "Both drugs can increase potassium retention",
    recommendations: "Monitor potassium levels regularly."
  },
  {
    drug_1: "Alprazolam",
    drug_2: "Alcohol",
    interaction: "Excessive sedation and respiratory depression.",
    severity: "High",
    mechanism: "Additive central nervous system depression",
    recommendations: "Avoid alcohol while taking alprazolam."
  },
  {
    drug_1: "Rifampin",
    drug_2: "Warfarin",
    interaction: "Reduced anticoagulant effect of warfarin.",
    severity: "High",
    mechanism: "Rifampin induces warfarin metabolism",
    recommendations: "Monitor INR closely and adjust warfarin dose."
  },
  {
    drug_1: "Cyclosporine",
    drug_2: "St John's Wort",
    interaction: "Reduced cyclosporine levels and transplant rejection risk.",
    severity: "High",
    mechanism: "St John's Wort induces cyclosporine metabolism",
    recommendations: "Avoid St John's Wort in transplant patients."
  },
  {
    drug_1: "Erythromycin",
    drug_2: "Simvastatin",
    interaction: "Increased risk of muscle damage.",
    severity: "High",
    mechanism: "Erythromycin increases simvastatin blood levels",
    recommendations: "Consider temporary suspension of simvastatin."
  },
  {
    drug_1: "Phenytoin",
    drug_2: "Valproic Acid",
    interaction: "Altered levels of both medications.",
    severity: "Moderate",
    mechanism: "Complex interaction affecting metabolism of both drugs",
    recommendations: "Monitor levels of both medications closely."
  },
  {
    drug_1: "Metformin",
    drug_2: "Furosemide",
    interaction: "Risk of kidney problems and lactic acidosis.",
    severity: "Moderate",
    mechanism: "Furosemide can affect kidney function",
    recommendations: "Monitor kidney function and adjust doses if needed."
  },
  {
    drug_1: "Cetirizine",
    drug_2: "Alcohol",
    interaction: "May cause increased drowsiness and impaired alertness.",
    severity: "Moderate",
    mechanism: "Both substances have CNS depressant effects which can be additive when combined",
    recommendations: "Avoid alcohol while taking cetirizine. If alcohol cannot be avoided, use caution when driving or operating machinery."
  },
  {
    drug_1: "Sertraline",
    drug_2: "Ibuprofen",
    interaction: "Increased risk of bleeding, particularly gastrointestinal bleeding.",
    severity: "Moderate",
    mechanism: "SSRIs like sertraline can decrease platelet aggregation, while NSAIDs affect prostaglandin production",
    recommendations: "Monitor for signs of bleeding. Consider alternative pain reliever or add gastroprotection."
  },
  {
    drug_1: "Escitalopram",
    drug_2: "Ondansetron",
    interaction: "Risk of irregular heart rhythm (QT prolongation).",
    severity: "Moderate",
    mechanism: "Both medications can affect heart rhythm by prolonging the QT interval",
    recommendations: "Monitor ECG if concurrent use necessary. Consider alternative antiemetic."
  },
  {
    drug_1: "Duloxetine",
    drug_2: "Tramadol",
    interaction: "Increased risk of serotonin syndrome and seizures.",
    severity: "High",
    mechanism: "Both medications increase serotonin levels in the brain",
    recommendations: "Avoid combination if possible. Monitor for symptoms of serotonin syndrome."
  },
  {
    drug_1: "Venlafaxine",
    drug_2: "Metoprolol",
    interaction: "Increased metoprolol levels and enhanced beta-blocking effects.",
    severity: "Moderate",
    mechanism: "Venlafaxine inhibits the metabolism of metoprolol",
    recommendations: "Monitor blood pressure and heart rate. Consider metoprolol dose reduction."
  },
  {
    drug_1: "Clopidogrel",
    drug_2: "Esomeprazole",
    interaction: "Reduced antiplatelet effect of clopidogrel.",
    severity: "Moderate",
    mechanism: "Esomeprazole inhibits conversion of clopidogrel to its active form",
    recommendations: "Consider using pantoprazole instead of esomeprazole."
  },
  {
    drug_1: "Rosuvastatin",
    drug_2: "Cyclosporine",
    interaction: "Increased risk of muscle damage (myopathy).",
    severity: "High",
    mechanism: "Cyclosporine increases rosuvastatin blood levels",
    recommendations: "Use lowest possible rosuvastatin dose. Monitor for muscle symptoms."
  },
  {
    drug_1: "Levothyroxine",
    drug_2: "Iron",
    interaction: "Decreased levothyroxine absorption.",
    severity: "Moderate",
    mechanism: "Iron forms complexes with levothyroxine in the gut",
    recommendations: "Separate doses by at least 4 hours."
  },
  {
    drug_1: "Carvedilol",
    drug_2: "Insulin",
    interaction: "May mask symptoms of hypoglycemia.",
    severity: "Moderate",
    mechanism: "Beta-blockers can hide warning signs of low blood sugar",
    recommendations: "Monitor blood glucose more frequently."
  },
  {
    drug_1: "Ramipril",
    drug_2: "Aliskiren",
    interaction: "Increased risk of kidney problems and high potassium.",
    severity: "High",
    mechanism: "Dual blockade of the renin-angiotensin system",
    recommendations: "Avoid combination, especially in diabetes or kidney disease."
  },
  {
    drug_1: "Tamsulosin",
    drug_2: "Sildenafil",
    interaction: "Risk of severe low blood pressure.",
    severity: "Moderate",
    mechanism: "Additive blood pressure-lowering effects",
    recommendations: "Space doses apart. Monitor for hypotension symptoms."
  },
  {
    drug_1: "Gabapentin",
    drug_2: "Morphine",
    interaction: "Increased risk of respiratory depression.",
    severity: "Moderate",
    mechanism: "Additive central nervous system depression",
    recommendations: "Start with lower doses. Monitor respiratory rate."
  },
  {
    drug_1: "Pregabalin",
    drug_2: "Oxycodone",
    interaction: "Enhanced sedation and respiratory depression.",
    severity: "Moderate",
    mechanism: "Synergistic CNS depressant effects",
    recommendations: "Use lower doses of both medications. Monitor closely."
  },
  {
    drug_1: "Methotrexate",
    drug_2: "Sulfamethoxazole",
    interaction: "Increased risk of methotrexate toxicity.",
    severity: "High",
    mechanism: "Reduced methotrexate elimination",
    recommendations: "Avoid combination if possible. Monitor blood counts closely."
  },
  {
    drug_1: "Tacrolimus",
    drug_2: "Fluconazole",
    interaction: "Increased tacrolimus levels and toxicity risk.",
    severity: "High",
    mechanism: "Fluconazole inhibits tacrolimus metabolism",
    recommendations: "Reduce tacrolimus dose. Monitor levels closely."
  },
  {
    drug_1: "Ciprofloxacin",
    drug_2: "Tizanidine",
    interaction: "Severe low blood pressure and excessive sedation.",
    severity: "High",
    mechanism: "Ciprofloxacin increases tizanidine blood levels",
    recommendations: "Avoid combination. Use alternative antibiotic."
  },
  {
    drug_1: "Amitriptyline",
    drug_2: "Quetiapine",
    interaction: "Increased risk of irregular heart rhythm.",
    severity: "Moderate",
    mechanism: "Both can prolong QT interval",
    recommendations: "Monitor ECG. Consider alternative medications."
  },
  {
    drug_1: "Losartan",
    drug_2: "Spironolactone",
    interaction: "Risk of dangerously high potassium levels.",
    severity: "Moderate",
    mechanism: "Both medications can increase potassium retention",
    recommendations: "Monitor potassium levels regularly."
  },
  {
    drug_1: "Diltiazem",
    drug_2: "Simvastatin",
    interaction: "Increased risk of muscle damage.",
    severity: "High",
    mechanism: "Diltiazem increases simvastatin levels",
    recommendations: "Limit simvastatin dose to 10mg daily."
  },
  {
    drug_1: "Paroxetine",
    drug_2: "Metoprolol",
    interaction: "Increased metoprolol effects.",
    severity: "Moderate",
    mechanism: "Paroxetine inhibits metoprolol metabolism",
    recommendations: "Monitor heart rate and blood pressure."
  },
  {
    drug_1: "Amlodipine",
    drug_2: "Clopidogrel",
    interaction: "Reduced antiplatelet effect.",
    severity: "Moderate",
    mechanism: "Amlodipine may interfere with clopidogrel activation",
    recommendations: "Monitor for cardiovascular events."
  },
  {
    drug_1: "Pantoprazole",
    drug_2: "Iron",
    interaction: "Reduced iron absorption.",
    severity: "Moderate",
    mechanism: "Acid suppression affects iron absorption",
    recommendations: "Space doses by at least 2 hours."
  },
  {
    drug_1: "Metronidazole",
    drug_2: "Warfarin",
    interaction: "Increased bleeding risk.",
    severity: "High",
    mechanism: "Metronidazole potentiates warfarin's effect",
    recommendations: "Monitor INR closely. Adjust warfarin dose."
  },
  {
    drug_1: "Clarithromycin",
    drug_2: "Carbamazepine",
    interaction: "Risk of carbamazepine toxicity.",
    severity: "High",
    mechanism: "Clarithromycin inhibits carbamazepine metabolism",
    recommendations: "Monitor carbamazepine levels. Consider alternative antibiotic."
  },
  {
    drug_1: "Lisinopril",
    drug_2: "Sacubitril",
    interaction: "Risk of angioedema.",
    severity: "High",
    mechanism: "Increased bradykinin levels",
    recommendations: "Never use together. Wait 36 hours between medications."
  },
  {
    drug_1: "Fluoxetine",
    drug_2: "Lithium",
    interaction: "Risk of serotonin syndrome and lithium toxicity.",
    severity: "Moderate",
    mechanism: "Fluoxetine may increase lithium levels",
    recommendations: "Monitor lithium levels and watch for serotonin syndrome."
  },
  {
    drug_1: "Bisoprolol",
    drug_2: "Verapamil",
    interaction: "Risk of heart block and severe bradycardia.",
    severity: "High",
    mechanism: "Additive effects on heart conduction",
    recommendations: "Avoid combination if possible. Monitor heart rate."
  },
  {
    drug_1: "Enalapril",
    drug_2: "Trimethoprim",
    interaction: "Risk of high potassium levels.",
    severity: "Moderate",
    mechanism: "Both drugs can increase potassium retention",
    recommendations: "Monitor potassium levels regularly."
  },
  {
    drug_1: "Doxycycline",
    drug_2: "Calcium",
    interaction: "Reduced doxycycline absorption.",
    severity: "Moderate",
    mechanism: "Calcium chelates with doxycycline",
    recommendations: "Space doses by at least 2 hours."
  },
  {
    drug_1: "Escitalopram",
    drug_2: "Aspirin",
    interaction: "Increased bleeding risk.",
    severity: "Moderate",
    mechanism: "Combined effects on platelet function",
    recommendations: "Monitor for signs of bleeding."
  },
  {
    drug_1: "Azithromycin",
    drug_2: "Amiodarone",
    interaction: "Increased risk of irregular heartbeat.",
    severity: "High",
    mechanism: "Both drugs can prolong QT interval",
    recommendations: "Avoid combination if possible. Monitor ECG."
  },
  {
    drug_1: "Hydrocodone",
    drug_2: "Alprazolam",
    interaction: "Severe drowsiness and respiratory depression.",
    severity: "High",
    mechanism: "Additive CNS and respiratory depressant effects",
    recommendations: "Avoid combination. Use lowest possible doses if necessary."
  },
  {
    drug_1: "Metoprolol",
    drug_2: "Albuterol",
    interaction: "Reduced effectiveness of both medications.",
    severity: "Moderate",
    mechanism: "Beta-blocker blocks effects of beta-agonist",
    recommendations: "Consider cardioselective beta-blocker if both needed."
  },
  {
    drug_1: "Furosemide",
    drug_2: "Gentamicin",
    interaction: "Increased risk of kidney damage and hearing loss.",
    severity: "High",
    mechanism: "Additive effects on kidney function and ear toxicity",
    recommendations: "Monitor kidney function and hearing. Adjust doses."
  },
  {
    drug_1: "Phenytoin",
    drug_2: "Omeprazole",
    interaction: "Altered phenytoin levels.",
    severity: "Moderate",
    mechanism: "Omeprazole affects phenytoin metabolism",
    recommendations: "Monitor phenytoin levels."
  },
  {
    drug_1: "Citalopram",
    drug_2: "Metoclopramide",
    interaction: "Risk of serotonin syndrome.",
    severity: "Moderate",
    mechanism: "Both drugs increase serotonin activity",
    recommendations: "Monitor for serotonin syndrome symptoms."
  },
  {
    drug_1: "Atorvastatin",
    drug_2: "Niacin",
    interaction: "Increased risk of muscle damage.",
    severity: "Moderate",
    mechanism: "Additive risk of muscle toxicity",
    recommendations: "Monitor for muscle pain and weakness."
  },
  {
    drug_1: "Digoxin",
    drug_2: "Spironolactone",
    interaction: "Altered digoxin levels.",
    severity: "Moderate",
    mechanism: "Spironolactone affects digoxin monitoring",
    recommendations: "Monitor digoxin levels carefully."
  },
  {
    drug_1: "Rifampin",
    drug_2: "Voriconazole",
    interaction: "Reduced voriconazole effectiveness.",
    severity: "High",
    mechanism: "Rifampin induces voriconazole metabolism",
    recommendations: "Avoid combination if possible."
  },
  {
    drug_1: "Amoxicillin",
    drug_2: "Probenecid",
    interaction: "Increased amoxicillin levels.",
    severity: "Moderate",
    mechanism: "Probenecid reduces amoxicillin excretion",
    recommendations: "Monitor for amoxicillin side effects."
  },
  {
    drug_1: "Potassium",
    drug_2: "Enalapril",
    interaction: "Risk of high potassium levels.",
    severity: "High",
    mechanism: "Additive effects on potassium retention",
    recommendations: "Monitor potassium levels regularly."
  },
  {
    drug_1: "Carbamazepine",
    drug_2: "Fluoxetine",
    interaction: "Altered levels of both medications.",
    severity: "Moderate",
    mechanism: "Complex interaction affecting both drugs",
    recommendations: "Monitor drug levels and effectiveness."
  },
  {
    drug_1: "Pravastatin",
    drug_2: "Colchicine",
    interaction: "Increased risk of muscle damage.",
    severity: "Moderate",
    mechanism: "Additive risk of muscle toxicity",
    recommendations: "Monitor for muscle symptoms."
  },
  {
    drug_1: "Metronidazole",
    drug_2: "Lithium",
    interaction: "Increased lithium toxicity risk.",
    severity: "Moderate",
    mechanism: "Reduced lithium elimination",
    recommendations: "Monitor lithium levels closely."
  },
  {
    drug_1: "Ciprofloxacin",
    drug_2: "Iron",
    interaction: "Reduced ciprofloxacin absorption.",
    severity: "Moderate",
    mechanism: "Iron chelates with ciprofloxacin",
    recommendations: "Space doses by at least 2 hours."
  },
  {
    drug_1: "Verapamil",
    drug_2: "Carbamazepine",
    interaction: "Reduced effectiveness of both drugs.",
    severity: "Moderate",
    mechanism: "Each drug affects the other's metabolism",
    recommendations: "Monitor drug levels and effectiveness."
  },
  {
    drug_1: "Warfarin",
    drug_2: "Vitamin K",
    interaction: "Reduced warfarin effectiveness.",
    severity: "High",
    mechanism: "Vitamin K directly opposes warfarin's effect",
    recommendations: "Maintain consistent vitamin K intake."
  },
  {
    drug_1: "Simvastatin",
    drug_2: "Niacin",
    interaction: "Increased risk of muscle damage.",
    severity: "Moderate",
    mechanism: "Additive risk of muscle toxicity",
    recommendations: "Monitor for muscle pain and weakness."
  },
  {
    drug_1: "Lisinopril",
    drug_2: "Lithium",
    interaction: "Increased lithium levels.",
    severity: "Moderate",
    mechanism: "Reduced lithium excretion",
    recommendations: "Monitor lithium levels regularly."
  },
  {
    drug_1: "Tramadol",
    drug_2: "Cyclobenzaprine",
    interaction: "Increased risk of seizures and serotonin syndrome.",
    severity: "High",
    mechanism: "Both drugs affect serotonin levels",
    recommendations: "Avoid combination if possible."
  },
  {
    drug_1: "Omeprazole",
    drug_2: "Cilostazol",
    interaction: "Increased cilostazol levels.",
    severity: "Moderate",
    mechanism: "Reduced cilostazol metabolism",
    recommendations: "Monitor for increased side effects."
  },
  {
    drug_1: "Fluconazole",
    drug_2: "Hydrocodone",
    interaction: "Increased hydrocodone effects.",
    severity: "Moderate",
    mechanism: "Reduced hydrocodone metabolism",
    recommendations: "Monitor for increased sedation."
  },
  {
    drug_1: "Amiodarone",
    drug_2: "Levofloxacin",
    interaction: "Risk of severe heart rhythm problems.",
    severity: "High",
    mechanism: "Additive effects on QT interval",
    recommendations: "Avoid combination if possible."
  },
  {
    drug_1: "Diltiazem",
    drug_2: "Buspirone",
    interaction: "Increased buspirone effects.",
    severity: "Moderate",
    mechanism: "Reduced buspirone metabolism",
    recommendations: "Start with lower buspirone dose."
  },
  {
    drug_1: "Carvedilol",
    drug_2: "Digoxin",
    interaction: "Increased digoxin levels.",
    severity: "Moderate",
    mechanism: "Reduced digoxin clearance",
    recommendations: "Monitor digoxin levels."
  },
  {
    drug_1: "Metformin",
    drug_2: "Hydrochlorothiazide",
    interaction: "Risk of blood sugar fluctuations.",
    severity: "Moderate",
    mechanism: "Thiazides can increase blood sugar",
    recommendations: "Monitor blood glucose more frequently."
  },
  {
    drug_1: "Alprazolam",
    drug_2: "Fluoxetine",
    interaction: "Increased alprazolam effects.",
    severity: "Moderate",
    mechanism: "Reduced alprazolam metabolism",
    recommendations: "Consider alprazolam dose reduction."
  },
  {
    drug_1: "Clopidogrel",
    drug_2: "Aspirin",
    interaction: "Increased bleeding risk.",
    severity: "Moderate",
    mechanism: "Additive antiplatelet effects",
    recommendations: "Monitor for bleeding signs."
  },
  {
    drug_1: "Dolo 650",
    drug_2: "Warfarin",
    interaction: "Increased risk of bleeding when taken regularly in high doses.",
    severity: "Moderate",
    mechanism: "Regular high-dose paracetamol may enhance the anticoagulant effect of warfarin",
    recommendations: "Monitor INR more frequently if using Dolo 650 regularly. Limit to recommended dose."
  },
  {
    drug_1: "Dolo 650",
    drug_2: "Alcohol",
    interaction: "Increased risk of liver damage.",
    severity: "High",
    mechanism: "Both substances are metabolized in the liver and can cause additive hepatotoxicity",
    recommendations: "Avoid alcohol while taking Dolo 650. Never exceed recommended daily dose."
  },
  {
    drug_1: "Dolo 650",
    drug_2: "Methotrexate",
    interaction: "May increase risk of methotrexate toxicity.",
    severity: "Moderate",
    mechanism: "Can affect methotrexate elimination",
    recommendations: "Monitor for signs of methotrexate toxicity. Use with caution in long-term therapy."
  },
  {
    drug_1: "Paracetamol",
    drug_2: "Isoniazid",
    interaction: "Increased risk of liver toxicity.",
    severity: "High",
    mechanism: "Isoniazid can affect paracetamol metabolism leading to increased toxic metabolites",
    recommendations: "Monitor liver function. Consider dose reduction of paracetamol."
  },
  {
    drug_1: "Paracetamol",
    drug_2: "Carbamazepine",
    interaction: "Reduced pain-relieving effect of paracetamol and increased risk of liver toxicity.",
    severity: "Moderate",
    mechanism: "Carbamazepine induces liver enzymes that metabolize paracetamol",
    recommendations: "Monitor effectiveness of pain relief. Never exceed recommended paracetamol dose."
  },
  {
    drug_1: "Atenolol",
    drug_2: "Hydrochlorothiazide",
    interaction: "Increased risk of hypotension and electrolyte imbalance.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood pressure through different mechanisms.",
    recommendations: "Monitor blood pressure and electrolytes closely."
  },
  {
    drug_1: "Ibuprofen",
    drug_2: "Lisinopril",
    interaction: "Reduced effectiveness of lisinopril. Risk of acute kidney injury.",
    severity: "High",
    mechanism: "Ibuprofen can reduce the antihypertensive effect of lisinopril.",
    recommendations: "Use with caution. Monitor kidney function."
  },
  {
    drug_1: "Omeprazole",
    drug_2: "Clopidogrel",
    interaction: "Reduced effectiveness of clopidogrel. Increased risk of cardiovascular events.",
    severity: "High",
    mechanism: "Omeprazole inhibits the activation of clopidogrel.",
    recommendations: "Consider alternative therapies."
  },
  {
    drug_1: "Metformin",
    drug_2: "Glipizide",
    interaction: "Additive effect on blood glucose lowering. Risk of hypoglycemia.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood glucose through different mechanisms.",
    recommendations: "Monitor blood glucose levels closely."
  },
  {
    drug_1: "Warfarin",
    drug_2: "Fluconazole",
    interaction: "Increased risk of bleeding due to warfarin interaction.",
    severity: "High",
    mechanism: "Fluconazole inhibits warfarin metabolism.",
    recommendations: "Monitor INR closely and adjust warfarin dose as needed."
  },
  {
    drug_1: "Simvastatin",
    drug_2: "Diltiazem",
    interaction: "Increased risk of statin-related muscle toxicity.",
    severity: "High",
    mechanism: "Diltiazem inhibits the metabolism of simvastatin.",
    recommendations: "Monitor for muscle symptoms."
  },
  {
    drug_1: "Ciprofloxacin",
    drug_2: "Theophylline",
    interaction: "Increased theophylline levels leading to toxicity.",
    severity: "High",
    mechanism: "Ciprofloxacin inhibits the metabolism of theophylline.",
    recommendations: "Monitor theophylline levels closely."
  },
  {
    drug_1: "Levothyroxine",
    drug_2: "Calcium",
    interaction: "Reduced absorption of levothyroxine.",
    severity: "Moderate",
    mechanism: "Calcium can bind to levothyroxine and reduce its absorption.",
    recommendations: "Separate dosing by at least 4 hours."
  },
  {
    drug_1: "Lithium",
    drug_2: "NSAIDs",
    interaction: "Increased lithium levels leading to toxicity.",
    severity: "High",
    mechanism: "NSAIDs can reduce renal clearance of lithium.",
    recommendations: "Monitor lithium levels and renal function."
  },
  {
    drug_1: "Furosemide",
    drug_2: "Aminoglycosides",
    interaction: "Increased risk of nephrotoxicity and ototoxicity.",
    severity: "High",
    mechanism: "Both drugs can affect renal function."
    recommendations: "Monitor renal function and consider alternatives."
  },
  {
    drug_1: "Rifampin",
    drug_2: "Oral Contraceptives",
    interaction: "Reduced effectiveness of oral contraceptives.",
    severity: "High",
    mechanism: "Rifampin induces metabolism of contraceptive hormones.",
    recommendations: "Use additional contraceptive methods."
  },
  {
    drug_1: "Aspirin",
    drug_2: "Clopidogrel",
    interaction: "Increased risk of bleeding.",
    severity: "High",
    mechanism: "Both drugs affect platelet function.",
    recommendations: "Monitor for signs of bleeding."
  },
  {
    drug_1: "Simvastatin",
    drug_2: "Erythromycin",
    interaction: "Increased risk of muscle damage.",
    severity: "High",
    mechanism: "Erythromycin inhibits the metabolism of simvastatin.",
    recommendations: "Avoid combination if possible."
  },
  {
    drug_1: "Metformin",
    drug_2: "Sitagliptin",
    interaction: "Additive effect on blood glucose lowering.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood glucose through different mechanisms.",
    recommendations: "Monitor blood glucose levels."
  },
  {
    drug_1: "Albuterol",
    drug_2: "Ipratropium",
    interaction: "Additive bronchodilation effect.",
    severity: "Moderate",
    mechanism: "Both drugs are bronchodilators.",
    recommendations: "Use together for enhanced effect in asthma management."
  },
  {
    drug_1: "Omeprazole",
    drug_2: "Warfarin",
    interaction: "Increased risk of bleeding due to warfarin interaction.",
    severity: "High",
    mechanism: "Omeprazole can alter warfarin metabolism.",
    recommendations: "Monitor INR closely."
  },
  {
    drug_1: "Levothyroxine",
    drug_2: "Iron Supplements",
    interaction: "Reduced absorption of levothyroxine.",
    severity: "Moderate",
    mechanism: "Iron can bind to levothyroxine and reduce its absorption.",
    recommendations: "Separate dosing by at least 4 hours."
  },
  {
    drug_1: "Hydrochlorothiazide",
    drug_2: "Lithium",
    interaction: "Increased lithium levels leading to toxicity.",
    severity: "High",
    mechanism: "Thiazide diuretics can reduce renal clearance of lithium.",
    recommendations: "Monitor lithium levels."
  },
  {
    drug_1: "Fluoxetine",
    drug_2: "Tramadol",
    interaction: "Increased risk of serotonin syndrome.",
    severity: "High",
    mechanism: "Both drugs affect serotonin levels.",
    recommendations: "Monitor for symptoms of serotonin syndrome."
  },
  {
    drug_1: "Ciprofloxacin",
    drug_2: "Warfarin",
    interaction: "Increased risk of bleeding.",
    severity: "High",
    mechanism: "Ciprofloxacin can enhance the anticoagulant effect of warfarin.",
    recommendations: "Monitor INR closely."
  },
  {
    drug_1: "Diltiazem",
    drug_2: "Simvastatin",
    interaction: "Increased risk of statin-related muscle toxicity.",
    severity: "High",
    mechanism: "Diltiazem inhibits the metabolism of simvastatin.",
    recommendations: "Monitor for muscle symptoms."
  },
  {
    drug_1: "Metoprolol",
    drug_2: "Amlodipine",
    interaction: "Additive effect on lowering blood pressure.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood pressure through different mechanisms.",
    recommendations: "Monitor blood pressure regularly."
  },
  {
    drug_1: "Furosemide",
    drug_2: "Lithium",
    interaction: "Increased lithium levels leading to toxicity.",
    severity: "High",
    mechanism: "Furosemide can reduce renal clearance of lithium.",
    recommendations: "Monitor lithium levels closely."
  },
  {
    drug_1: "Gabapentin",
    drug_2: "Oxycodone",
    interaction: "Increased risk of respiratory depression.",
    severity: "High",
    mechanism: "Both drugs can depress the central nervous system.",
    recommendations: "Monitor for signs of respiratory depression."
  },
  {
    drug_1: "Sertraline",
    drug_2: "Tramadol",
    interaction: "Increased risk of serotonin syndrome.",
    severity: "High",
    mechanism: "Both drugs affect serotonin levels.",
    recommendations: "Monitor for symptoms of serotonin syndrome."
  },
  {
    drug_1: "Ranitidine",
    drug_2: "Warfarin",
    interaction: "Increased risk of bleeding.",
    severity: "Moderate",
    mechanism: "Ranitidine can alter warfarin metabolism.",
    recommendations: "Monitor INR closely."
  },
  {
    drug_1: "Dexamethasone",
    drug_2: "Warfarin",
    interaction: "Increased risk of bleeding.",
    severity: "High",
    mechanism: "Dexamethasone can affect warfarin metabolism.",
    recommendations: "Monitor INR closely."
  },
  {
    drug_1: "Citalopram",
    drug_2: "Sumatriptan",
    interaction: "Increased risk of serotonin syndrome.",
    severity: "High",
    mechanism: "Both drugs affect serotonin levels.",
    recommendations: "Monitor for symptoms of serotonin syndrome."
  },
  {
    drug_1: "Digoxin",
    drug_2: "Amiodarone",
    interaction: "Increased digoxin levels leading to toxicity.",
    severity: "High",
    mechanism: "Amiodarone can inhibit digoxin metabolism.",
    recommendations: "Monitor digoxin levels closely."
  },
  {
    drug_1: "Tamsulosin",
    drug_2: "Sildenafil",
    interaction: "Increased risk of hypotension.",
    severity: "Moderate",
    mechanism: "Both drugs can lower blood pressure.",
    recommendations: "Monitor blood pressure."
  },
  {
    drug_1: "Zolpidem",
    drug_2: "Fluoxetine",
    interaction: "Increased sedation.",
    severity: "Moderate",
    mechanism: "Both drugs can cause sedation.",
    recommendations: "Use caution when combining."
  },
  {
    drug_1: "Paracetamol",
    drug_2: "Ibuprofen",
    interaction: "Increased risk of gastrointestinal side effects.",
    severity: "Moderate",
    mechanism: "Both drugs can irritate the gastrointestinal tract.",
    recommendations: "Use with caution, especially in patients with gastrointestinal issues."
  },
  {
    drug_1: "Amlodipine",
    drug_2: "Atorvastatin",
    interaction: "Additive effect on lowering blood pressure and cholesterol.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood pressure and cholesterol through different mechanisms.",
    recommendations: "Monitor blood pressure and lipid levels."
  },
  {
    drug_1: "Metformin",
    drug_2: "Glimepiride",
    interaction: "Additive effect on blood glucose lowering.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood glucose through different mechanisms.",
    recommendations: "Monitor blood glucose levels closely."
  },
  {
    drug_1: "Salbutamol",
    drug_2: "Ipratropium",
    interaction: "Additive bronchodilation effect.",
    severity: "Moderate",
    mechanism: "Both drugs are bronchodilators.",
    recommendations: "Use together for enhanced effect in asthma management."
  },
  {
    drug_1: "Ciprofloxacin",
    drug_2: "Metronidazole",
    interaction: "Increased risk of CNS toxicity.",
    severity: "Moderate",
    mechanism: "Both drugs can affect the central nervous system.",
    recommendations: "Monitor for neurological symptoms."
  },
  {
    drug_1: "Lisinopril",
    drug_2: "Hydrochlorothiazide",
    interaction: "Additive effect on lowering blood pressure.",
    severity: "Moderate",
    mechanism: "Both drugs lower blood pressure through different mechanisms.",
    recommendations: "Monitor blood pressure regularly."
  },
  {
    drug_1: "Diclofenac",
    drug_2: "Misoprostol",
    interaction: "Misoprostol can reduce gastrointestinal side effects of diclofenac.",
    severity: "Moderate",
    mechanism: "Misoprostol protects the gastrointestinal lining.",
    recommendations: "Use together to mitigate gastrointestinal risks."
  },
  {
    drug_1: "Sodium Valproate",
    drug_2: "Lamotrigine",
    interaction: "Increased risk of lamotrigine toxicity.",
    severity: "High",
    mechanism: "Sodium valproate can inhibit lamotrigine metabolism.",
    recommendations: "Monitor lamotrigine levels closely."
  },
  {
    drug_1: "Rifampicin",
    drug_2: "Isoniazid",
    interaction: "Increased risk of hepatotoxicity.",
    severity: "High",
    mechanism: "Both drugs can cause liver damage.",
    recommendations: "Monitor liver function tests regularly."
  },
  {
    drug_1: "Cetirizine",
    drug_2: "Alcohol",
    interaction: "Increased sedation.",
    severity: "Moderate",
    mechanism: "Both substances have CNS depressant effects which can be additive when combined",
    recommendations: "Avoid alcohol consumption while taking cetirizine."
  },
  // ... Additional 125 drug interactions
];

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/drug_interactions', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(async () => {
  console.log('Connected to MongoDB.');
  
  try {
    // Clear existing interactions
    await Interaction.deleteMany({});
    console.log('Cleared existing interactions.');

    // Insert new interactions
    const result = await Interaction.insertMany(
      interactions.map(interaction => ({
        ...interaction,
        drug_1: interaction.drug_1.toLowerCase(),
        drug_2: interaction.drug_2.toLowerCase()
      }))
    );
    console.log(`Added ${result.length} interactions to the database.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
