import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography, Rate, Checkbox, Modal, Tabs, Badge } from 'antd';
import { StarFilled, PercentageOutlined, SwapOutlined, CloseOutlined, SafetyCertificateOutlined, GiftOutlined, DollarOutlined, FieldTimeOutlined, FileProtectOutlined, DownloadOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


// Bank logos from public directory
const bankLogos = {
  hdfc: "/images/partners/hdfc.jpg",
  icici: "/images/partners/icici.jpg",
  axis: "/images/partners/Axis_Bank-Logo.png",
  idfc: "/images/partners/idfc.jpg",
  yes: "/images/partners/yes.png",
  bandhan: "/images/partners/Bandhanbanklogo.jpg",
  csb: "/images/partners/csb.png",
  dcb: "/images/partners/DCB.jpg",
  federal: "/images/partners/federal.png",
  indusind: "/images/partners/indusind.png",
  kvb: "/images/partners/karur.png",
  kotak: "/images/partners/kotak.jpg",
  rbl: "/images/partners/RBL.png",
  sib: "/images/partners/southIndianBank.jpg"
};

interface Loan {
  id: number;
  name: string;
  bankName: string;
  bankLogo: string;
  interestRate: string;
  processingFee: string;
  maxAmount: string;
  minAmount: string;
  tenure: string;
  rating: number;
  suitedFor: string[];
  benefit: string;
  benefitIcon: typeof StarFilled | typeof PercentageOutlined | typeof DollarOutlined | typeof FieldTimeOutlined | typeof FileProtectOutlined;
}

interface LoanDetails {
  features: string[];
  benefits: string[];
  fees: {
    processing: string;
    prepayment: string;
    latePenalty: string;
  };
  eligibility: {
    salaried: string[];
    selfEmployed: string[];
  };
  documents: {
    salaried: string[];
    selfEmployed: string[];
  };
  maxAmount: string;
  minAmount: string;
  tenure: string;
  interestRate: string;
}

interface LoanDetailsMap {
  [key: string]: LoanDetails;
}

const { Title, Text } = Typography;

const personalLoans: Loan[] = [
  {
    id: 1,
    name: "HDFC Bank Personal Loan",
    bankName: "HDFC Bank",
    bankLogo: bankLogos.hdfc,
    interestRate: "10.50% - 24.00% p.a.",
    processingFee: "Up to 2.50%",
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.8,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Instant approval within 10 seconds",
    benefitIcon: FieldTimeOutlined
  },
  {
    id: 2,
    name: "ICICI Bank Personal Loan",
    bankName: "ICICI Bank",
    bankLogo: bankLogos.icici,
    interestRate: "10.75% - 19.00% p.a.",
    processingFee: "Up to 2.25%",
    maxAmount: "₹50,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.7,
    suitedFor: ["Salaried", "Self-Employed", "Business Owners"],
    benefit: "Paperless digital journey",
    benefitIcon: FileProtectOutlined
  },
  {
    id: 3,
    name: "Axis Bank Personal Loan",
    bankName: "Axis Bank",
    bankLogo: bankLogos.axis,
    interestRate: "11.25% - 22.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹35,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.6,
    suitedFor: ["Salaried", "Self-Employed Professionals"],
    benefit: "Pre-approved offers for existing customers",
    benefitIcon: StarFilled
  },
  {
    id: 4,
    name: "IDFC FIRST Bank Personal Loan",
    bankName: "IDFC FIRST Bank",
    bankLogo: bankLogos.idfc,
    interestRate: "10.49% - 22.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹40,00,000",
    minAmount: "₹30,000",
    tenure: "12 - 60 months",
    rating: 4.6,
    suitedFor: ["Salaried", "Self-Employed", "Pensioners"],
    benefit: "Zero prepayment charges",
    benefitIcon: DollarOutlined
  },
  {
    id: 5,
    name: "Yes Bank Personal Loan",
    bankName: "Yes Bank",
    bankLogo: bankLogos.yes,
    interestRate: "11.50% - 24.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹35,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.4,
    suitedFor: ["Salaried", "Self-Employed", "Business Owners"],
    benefit: "End-to-end digital process",
    benefitIcon: FieldTimeOutlined
  },
  {
    id: 6,
    name: "Bandhan Bank Personal Loan",
    bankName: "Bandhan Bank",
    bankLogo: bankLogos.bandhan,
    interestRate: "11.00% - 20.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹25,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.3,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Quick loan approval",
    benefitIcon: FieldTimeOutlined
  },
  {
    id: 7,
    name: "CSB Bank Personal Loan",
    bankName: "CSB Bank",
    bankLogo: bankLogos.csb,
    interestRate: "11.50% - 21.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹20,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.2,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Minimal documentation",
    benefitIcon: FileProtectOutlined
  },
  {
    id: 8,
    name: "DCB Bank Personal Loan",
    bankName: "DCB Bank",
    bankLogo: bankLogos.dcb,
    interestRate: "11.25% - 22.00% p.a.",
    processingFee: "Up to 2.5%",
    maxAmount: "₹30,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.3,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Flexible repayment options",
    benefitIcon: DollarOutlined
  },
  {
    id: 9,
    name: "Federal Bank Personal Loan",
    bankName: "Federal Bank",
    bankLogo: bankLogos.federal,
    interestRate: "10.75% - 20.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹25,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.4,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Digital loan processing",
    benefitIcon: FieldTimeOutlined
  },
  {
    id: 10,
    name: "IndusInd Bank Personal Loan",
    bankName: "IndusInd Bank",
    bankLogo: bankLogos.indusind,
    interestRate: "10.50% - 21.00% p.a.",
    processingFee: "Up to 2.25%",
    maxAmount: "₹35,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.5,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Instant approval",
    benefitIcon: StarFilled
  },
  {
    id: 11,
    name: "Karur Vysya Bank Personal Loan",
    bankName: "Karur Vysya Bank",
    bankLogo: bankLogos.kvb,
    interestRate: "11.00% - 20.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹20,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.2,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Easy documentation",
    benefitIcon: FileProtectOutlined
  },
  {
    id: 12,
    name: "Kotak Mahindra Bank Personal Loan",
    bankName: "Kotak Mahindra Bank",
    bankLogo: bankLogos.kotak,
    interestRate: "10.75% - 20.00% p.a.",
    processingFee: "Up to 2.5%",
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.6,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Competitive interest rates",
    benefitIcon: PercentageOutlined
  },
  {
    id: 13,
    name: "RBL Bank Personal Loan",
    bankName: "RBL Bank",
    bankLogo: bankLogos.rbl,
    interestRate: "11.25% - 22.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹30,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.3,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Quick disbursement",
    benefitIcon: FieldTimeOutlined
  },
  {
    id: 14,
    name: "South Indian Bank Personal Loan",
    bankName: "South Indian Bank",
    bankLogo: bankLogos.sib,
    interestRate: "11.50% - 21.00% p.a.",
    processingFee: "Up to 2%",
    maxAmount: "₹25,00,000",
    minAmount: "₹50,000",
    tenure: "12 - 60 months",
    rating: 4.2,
    suitedFor: ["Salaried", "Self-Employed"],
    benefit: "Flexible loan terms",
    benefitIcon: DollarOutlined
  }
];

const loanDetails: LoanDetailsMap = {
  "HDFC Bank Personal Loan": {
    features: [
      "Instant disbursement within 4 hours",
      "100% paperless process",
      "No collateral required",
      "Flexible tenure options",
      "Part-payment facility available"
    ],
    benefits: [
      "Zero foreclosure charges after 12 months",
      "Special rates for existing customers",
      "Balance transfer facility available",
      "Minimal documentation required",
      "Online account management"
    ],
    fees: {
      processing: "Up to 2.50% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2.5% per month on unpaid amount"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment: Minimum 2 years total experience",
        "Credit score: 750+",
        "Residence stability: At least 1 year"
      ],
      selfEmployed: [
        "Age: 21-65 years",
        "Business vintage: 5+ years",
        "Minimum annual income: ₹5,00,000",
        "ITR for last 2 years",
        "Credit score: 750+"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16 for the last 2 years"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR with computation",
        "Last 6 months bank statements",
        "Business registration proof",
        "Office address proof"
      ]
    },
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12 to 60 months",
    interestRate: "10.50% - 24.00% p.a."
  },
  "ICICI Bank Personal Loan": {
    features: [
      "Digital approval in 3 hours",
      "No security deposit required",
      "Flexible EMI options",
      "Online loan management",
      "Multiple repayment modes"
    ],
    benefits: [
      "Top-up loan facility available",
      "Preferential rates for existing customers",
      "EMI holiday option available",
      "Quick disbursement",
      "Dedicated relationship manager"
    ],
    fees: {
      processing: "Up to 2.25% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on unpaid amount"
    },
    eligibility: {
      salaried: [
        "Age: 23-58 years",
        "Minimum income: ₹20,000 per month",
        "Employment: Minimum 2 years experience",
        "Credit score: 700+",
        "Residence stability: At least 1 year"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum annual income: ₹4,00,000",
        "ITR for last 2 years",
        "Credit score: 700+"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 12 months bank statements",
        "GST registration (if applicable)",
        "Business proof"
      ]
    },
    maxAmount: "₹50,00,000",
    minAmount: "₹50,000",
    tenure: "12 to 60 months",
    interestRate: "10.75% - 19.00% p.a."
  },
  "Axis Bank Personal Loan": {
    features: [
      "100% digital process",
      "Instant disbursement",
      "Zero collateral",
      "Minimal documentation",
      "Pre-approved offers"
    ],
    benefits: [
      "Competitive interest rates",
      "No hidden charges",
      "Flexible tenure options",
      "No security required",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 23-58 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 750+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 750+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof documents"
      ]
    },
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "10.50% - 22.00% p.a."
},

"IDFC FIRST Bank Personal Loan": {
    features: [
      "Digital application process",
      "Quick disbursement",
      "Zero collateral",
      "Flexible repayment options",
      "Online account management"
    ],
    benefits: [
      "Attractive interest rates",
      "No hidden charges",
      "No security deposit",
      "Easy EMI options",
      "Part payment allowed"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "Nil after 12 months",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 23-65 years",
        "Minimum income: ₹20,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹2.5 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 3 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹35,00,000",
    minAmount: "₹30,000",
    tenure: "12-60 months",
    interestRate: "10.49% - 24.00% p.a."
},

"Yes Bank Personal Loan": {
    features: [
      "Digital loan journey",
      "Quick approval",
      "Zero collateral",
      "Flexible repayment",
      "Online account access"
    ],
    benefits: [
      "Competitive rates",
      "Transparent charges",
      "No security needed",
      "Balance transfer facility",
      "Part payment option"
    ],
    fees: {
      processing: "Up to 2.5% of loan amount",
      prepayment: "4% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business registration proof"
      ]
    },
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "10.99% - 24.00% p.a."
},

"Bandhan Bank Personal Loan": {
    features: [
      "Quick processing",
      "Minimal documentation",
      "Zero collateral",
      "Flexible repayment",
      "Digital application"
    ],
    benefits: [
      "Competitive interest rates",
      "No hidden charges",
      "No security required",
      "Easy EMI options",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹20,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 650+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 2+ years",
        "Minimum income: ₹2.4 lakhs per annum",
        "Credit score: 650+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 3 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 1 year ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹25,00,000",
    minAmount: "₹25,000",
    tenure: "12-60 months",
    interestRate: "11.00% - 24.00% p.a."
},

"CSB Bank Personal Loan": {
    features: [
      "Digital process",
      "Quick approval",
      "Zero collateral",
      "Flexible repayment",
      "Online management"
    ],
    benefits: [
      "Competitive rates",
      "Transparent charges",
      "No security needed",
      "Easy EMI options",
      "Part payment allowed"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-58 years",
        "Minimum income: ₹20,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 650+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹2.4 lakhs per annum",
        "Credit score: 650+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 3 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹25,00,000",
    minAmount: "₹25,000",
    tenure: "12-60 months",
    interestRate: "11.50% - 24.00% p.a."
},

"DCB Bank Personal Loan": {
    features: [
      "Digital application",
      "Quick processing",
      "Zero collateral",
      "Flexible repayment",
      "Online account access"
    ],
    benefits: [
      "Competitive rates",
      "No hidden charges",
      "No security needed",
      "Easy EMI options",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹30,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "11.00% - 24.00% p.a."
},

"Federal Bank Personal Loan": {
    features: [
      "Digital process",
      "Quick disbursement",
      "Zero collateral",
      "Flexible repayment",
      "Online management"
    ],
    benefits: [
      "Competitive rates",
      "Transparent charges",
      "No security needed",
      "Easy EMI options",
      "Part payment allowed"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹30,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "10.99% - 24.00% p.a."
},

"IndusInd Bank Personal Loan": {
    features: [
      "Digital application",
      "Instant approval",
      "Zero collateral",
      "Flexible repayment",
      "Online account access"
    ],
    benefits: [
      "Competitive rates",
      "No hidden charges",
      "No security needed",
      "Balance transfer option",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2.5% of loan amount",
      prepayment: "3% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹35,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "10.49% - 22.00% p.a."
},

"Karur Vysya Bank Personal Loan": {
    features: [
      "Digital process",
      "Quick approval",
      "Zero collateral",
      "Flexible repayment",
      "Online management"
    ],
    benefits: [
      "Competitive rates",
      "Transparent charges",
      "No security needed",
      "Easy EMI options",
      "Part payment allowed"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-58 years",
        "Minimum income: ₹20,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 650+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹2.4 lakhs per annum",
        "Credit score: 650+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 3 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹25,00,000",
    minAmount: "₹25,000",
    tenure: "12-60 months",
    interestRate: "11.50% - 24.00% p.a."
},

"Kotak Mahindra Bank Personal Loan": {
    features: [
      "Digital application",
      "Instant approval",
      "Zero collateral",
      "Flexible repayment",
      "Online account access"
    ],
    benefits: [
      "Competitive rates",
      "No hidden charges",
      "No security needed",
      "Balance transfer option",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2.5% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 750+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 750+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹40,00,000",
    minAmount: "₹50,000",
    tenure: "12-60 months",
    interestRate: "10.49% - 24.00% p.a."
},

"RBL Bank Personal Loan": {
    features: [
      "Digital process",
      "Quick approval",
      "Zero collateral",
      "Flexible repayment",
      "Online management"
    ],
    benefits: [
      "Competitive rates",
      "Transparent charges",
      "No security needed",
      "Balance transfer facility",
      "Part payment allowed"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 23-58 years",
        "Minimum income: ₹25,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 700+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹3 lakhs per annum",
        "Credit score: 700+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 6 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹35,00,000",
    minAmount: "₹40,000",
    tenure: "12-60 months",
    interestRate: "10.99% - 24.00% p.a."
},

"South Indian Bank Personal Loan": {
    features: [
      "Digital process",
      "Quick approval",
      "Zero collateral",
      "Flexible repayment",
      "Online management"
    ],
    benefits: [
      "Competitive rates",
      "No hidden charges",
      "No security needed",
      "Easy EMI options",
      "Part payment facility"
    ],
    fees: {
      processing: "Up to 2% of loan amount",
      prepayment: "2% of outstanding amount",
      latePenalty: "2% per month on EMI"
    },
    eligibility: {
      salaried: [
        "Age: 21-60 years",
        "Minimum income: ₹20,000 per month",
        "Employment stability: 1+ years",
        "Credit score: 650+",
        "Indian resident"
      ],
      selfEmployed: [
        "Age: 25-65 years",
        "Business vintage: 3+ years",
        "Minimum income: ₹2.4 lakhs per annum",
        "Credit score: 650+",
        "Indian resident"
      ]
    },
    documents: {
      salaried: [
        "PAN Card",
        "Aadhaar Card",
        "Latest 3 months salary slips",
        "Last 3 months bank statements",
        "Form 16"
      ],
      selfEmployed: [
        "PAN Card",
        "Aadhaar Card",
        "Last 2 years ITR",
        "Last 6 months bank statements",
        "Business proof"
      ]
    },
    maxAmount: "₹25,00,000",
    minAmount: "₹25,000",
    tenure: "12-60 months",
    interestRate: "11.50% - 24.00% p.a."
}
};

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  margin-top: 70px;
`;

const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, 
    rgba(0, 32, 96, 0.97) 0%,
    rgba(0, 45, 114, 0.95) 50%,
    rgba(0, 64, 135, 0.92) 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/abstract-bg.jpg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    z-index: 1;
  }

   @media (max-width: 968px) {
    padding: 20px 0;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

   @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px 12px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;

    @media (max-width: 968px) {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 32px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;

    @media (max-width: 968px) {
      font-size: 1rem;
      margin-bottom: 24px;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const StatItem = styled(motion.div)`
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;

  @media (max-width: 968px) {
    text-align: center;
  }
`;
const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingCard = styled(motion.div)<{ index: number }>`
  position: absolute;
  width: 280px;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform-origin: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
    @media (max-width: 968px) {
      width: 220px;
      height: 130px;
      padding: 16px;
  }

  ${({ index }) => {
    const positions = [
      { top: '10%', right: '10%', rotate: '-15deg' },
      { top: '30%', right: '25%', rotate: '5deg' },
      { top: '50%', right: '15%', rotate: '-5deg' }
    ];
    return `
      top: ${positions[index].top};
      right: ${positions[index].right};
      transform: rotate(${positions[index].rotate});
    `;
  }}
  
`;

const CardBank = styled.div`
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardRate = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const CardAmount = styled.div`
  color: #4CAF50;
  font-weight: 600;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  height: 48px;
  padding: 0 32px;
  font-size: 1rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #262626;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr 200px;
  gap: 20px;
  align-items: center;
  padding: 16px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CardImageContainer = styled.div`
  width: 260px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 16px;
  min-height: 100%;

  > div {
    &:last-child {
      margin-top: auto;
      padding-top: 8px;
    }
  }
`;

const CardTitle = styled(Title)`
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 !important;
  color: #1a1a1a;
  line-height: 1.3 !important;
`;

const Tag = styled.span`
  padding: 4px 8px;
  background-color: rgba(0, 102, 204, 0.08);
  border-radius: 4px;
  font-size: 13px;
  color: #0066cc;
  font-weight: 500;
  white-space: nowrap;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 4px 0;
`;

const BenefitSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BenefitIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff2f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4d4f;
  font-size: 14px;
  flex-shrink: 0;
`;

const BenefitWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BenefitContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #262626;
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    overflow: visible;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }
  .ant-modal-body {
    padding: 0;
    overflow-y: auto;
    max-height: calc(90vh - 110px);

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 3px;
      &:hover {
        background: #999;
      }
    }
  }
  .ant-modal-header {
    flex-shrink: 0;
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0;
  }
`;

const CompareFloatingButton = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .anticon {
      color: #1890ff;
      margin-top: 4px;
    }
  }
`;

const FeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const FeeCard = styled.div`
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  h4 {
    margin: 0 0 8px 0;
    color: #1890ff;
  }
`;

const CompareCheckbox = styled(Checkbox)`
  .ant-checkbox {
    border-radius: 4px;
    border-color: #d9d9d9;
    
    &:hover {
      border-color: #1890ff;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }

  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border-radius: 4px;

    &:after {
      width: 6px;
      height: 10px;
    }
  }
`;

const CompareWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
`;

const CompareText = styled(Text)`
  font-size: 13px;
  color: #595959;
  user-select: none;
  
  &:hover {
    color: #1890ff;
  }
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
  }

  th {
    background-color: #fafafa;
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #fafafa;
  }

  td:first-child {
    font-weight: 500;
    color: #262626;
    text-align: left;
  }

  .ant-rate {
    justify-content: center;
  }
`;

const BankLogo = styled.img`
  height: 40px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const BankHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 200px;
  padding: 8px;
`;

const DownloadButton = styled(Button)`
  position: absolute;
  top: -45px;
  right: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PersonalLoanBankingPartners: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const compareContentRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = (loanName: string) => {
    setSelectedLoan(loanName);
  };

  const handleCloseModal = () => {
    setSelectedLoan(null);
  };

  const handleCloseCompareModal = () => {
    setIsCompareModalVisible(false);
  };

  const toggleLoanSelection = (loanName: string) => {
    setSelectedLoans(prev => {
      const newSelection = prev.includes(loanName)
        ? prev.filter(name => name !== loanName)
        : prev.length < 3
          ? [...prev, loanName]
          : prev;
      return newSelection;
    });
  };

  const handleCompare = () => {
    setIsCompareModalVisible(true);
  };

  const handleCheckEligibility = () => {
    navigate('/loans#loan-application');
  };

  const handleDownloadPDF = async (): Promise<void> => {
    if (!compareContentRef.current) return;
    
    try {
      // Create canvas from the comparison content
      const canvas = await html2canvas(compareContentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('loan-comparison.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const renderHeroSection = () => (
    <HeroSection>
      <HeroContent>
        <HeroText>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Personal Loans Made Simple
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare and choose from India's leading banks. Get instant approvals, 
            lowest interest rates, and zero prepayment charges.
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StyledButton type="primary" size="large" onClick={handleCheckEligibility}>
              Check Eligibility
            </StyledButton>
            <StyledButton 
              type="default" 
              ghost 
              size="large" 
              onClick={handleCompare}
              disabled={selectedLoans.length < 2}
            >
              Compare Loans
            </StyledButton>
          </HeroButtons>
          <HeroStats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StatItem>
              <StatValue>₹25L+</StatValue>
              <StatLabel>Maximum Loan Amount</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>8.99%</StatValue>
              <StatLabel>Interest Rate Starting</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>2 Days</StatValue>
              <StatLabel>Quick Disbursement</StatLabel>
            </StatItem>
          </HeroStats>
        </HeroText>
        <HeroVisual
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {[0, 1, 2].map((index) => (
            <FloatingCard
              key={index}
              index={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ scale: 1.05, rotate: '0deg' }}
            >
              <CardBank>{personalLoans[index].bankName}</CardBank>
              <CardDetails>
                <CardRate>From {personalLoans[index].interestRate}</CardRate>
                <CardAmount>Up to {personalLoans[index].maxAmount}</CardAmount>
              </CardDetails>
            </FloatingCard>
          ))}
        </HeroVisual>
      </HeroContent>
    </HeroSection>
  );

  return (
    <PageContainer>
      {renderHeroSection()}
      <Container>
        <CardsSection>
          <b></b>
          <b></b>
          <SectionTitle>
            Personal Loans - Banking Partners
          </SectionTitle>

          {personalLoans.map((loan: Loan) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: loan.id * 0.1 }}
            >
              <CardGrid>
                <CardImageContainer>
                  <img src={loan.bankLogo} alt={loan.name} />
                </CardImageContainer>

                <CardContent>
                  <div>
                    <CardTitle level={4}>{loan.name}</CardTitle>
                  </div>

                  <div>
                    <SectionTitle>Best suited for</SectionTitle>
                    <TagContainer>
                      {loan.suitedFor.map(suit => (
                        <Tag key={suit}>{suit}</Tag>
                      ))}
                    </TagContainer>
                  </div>

                  <BenefitSection>
                    <SectionTitle>Why this loan</SectionTitle>
                    <BenefitWrapper>
                      <BenefitIcon>
                        {React.createElement(loan.benefitIcon)}
                      </BenefitIcon>
                      <BenefitContent>{loan.benefit}</BenefitContent>
                    </BenefitWrapper>
                  </BenefitSection>

                  <CompareWrapper>
                    <CompareCheckbox
                      checked={selectedLoans.includes(loan.name)}
                      onChange={() => toggleLoanSelection(loan.name)}
                    />
                    <CompareText>Compare</CompareText>
                  </CompareWrapper>
                </CardContent>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <RatingContainer>
                    <Rate disabled defaultValue={loan.rating} style={{ fontSize: '16px' }} />
                    <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                      {loan.rating} Customer Rating
                    </Text>
                  </RatingContainer>
                  <Button onClick={() => handleViewDetails(loan.name)}>View Details</Button>
                  <Button 
  type="primary" 
  onClick={() => navigate('/apply', { state: { productType: 'Loans' } })}
>
  Apply
</Button>
                  <Text type="secondary" style={{ fontSize: '12px', textAlign: 'center' }}>
                    On bank website
                  </Text>
                </div>
              </CardGrid>
            </motion.div>
          ))}
            
          <AnimatePresence>
            {selectedLoans.length > 0 && (
              <CompareFloatingButton
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Badge count={selectedLoans.length} offset={[-5, 5]}>
                  <Button
                    type="primary"
                    icon={<SwapOutlined />}
                    onClick={handleCompare}
                    size="large"
                  />
                </Badge>
              </CompareFloatingButton>
            )}
          </AnimatePresence>
        </CardsSection>
      </Container>

      {selectedLoan && (
        <StyledModal
          open={!!selectedLoan}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
          title={selectedLoan}
          closeIcon={<CloseOutlined />}
        >
          <Tabs defaultActiveKey="1" items={[
            {
              key: '1',
              label: 'Key Features',
              children: (
                <FeatureList>
                  {loanDetails[selectedLoan]?.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SafetyCertificateOutlined />
                      {feature}
                    </motion.li>
                  ))}
                </FeatureList>
              ),
            },
            {
              key: '2',
              label: 'Rewards',
              children: (
                <FeatureList>
                  {loanDetails[selectedLoan]?.benefits.map((reward: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GiftOutlined />
                      {reward}
                    </motion.li>
                  ))}
                </FeatureList>
              ),
            },
            {
              key: '3',
              label: 'Fees',
              children: (
                <FeeGrid>
                  <FeeCard>
                    <h4>Processing Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.processing}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Prepayment Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.prepayment}</Text>
                  </FeeCard>
                  <FeeCard>
                    <h4>Late Penalty Fee</h4>
                    <Text>{loanDetails[selectedLoan]?.fees.latePenalty}</Text>
                  </FeeCard>
                </FeeGrid>
              ),
            },
          ]} />
        </StyledModal>
      )}
      <StyledModal
        open={isCompareModalVisible}
        onCancel={handleCloseCompareModal}
        footer={null}
        width={1000}
        title="Compare Personal Loans"
        closeIcon={<CloseOutlined />}
      >
        <DownloadButton type="primary" onClick={handleDownloadPDF} icon={<DownloadOutlined />}>
          Download Comparison
        </DownloadButton>
        <div ref={compareContentRef}>
          <CompareTable>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Features</th>
                {selectedLoans.map(loanName => {
                  const loan = personalLoans.find(loan => loan.name === loanName);
                  return (
                    <th key={loanName}>
                      <BankHeader>
                        <BankLogo src={loan?.bankLogo} alt={loan?.bankName} />
                        {loan?.bankName}
                      </BankHeader>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Interest Rate</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.interestRate}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Processing Fee</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.processingFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Maximum Amount</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.maxAmount}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Minimum Amount</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.minAmount}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Tenure</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.tenure}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    <Rate 
                      disabled 
                      defaultValue={personalLoans.find(loan => loan.name === loanName)?.rating} 
                      style={{ fontSize: '16px' }} 
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Key Benefit</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.benefit}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Suited For</td>
                {selectedLoans.map(loanName => (
                  <td key={loanName}>
                    {personalLoans.find(loan => loan.name === loanName)?.suitedFor.join(", ")}
                  </td>
                ))}
              </tr>
            </tbody>
          </CompareTable>
        </div>
      </StyledModal>
      <Footer />
    </PageContainer>
  );
};

export default PersonalLoanBankingPartners;
