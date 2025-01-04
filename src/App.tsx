import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar';

// Main Pages
import Home from './pages/Home/Home';
import PersonalLoan from './pages/PersonalLoan/PersonalLoan';
import CreditCards from './pages/CreditCards/CreditCards';
import BusinessLoan from './pages/BusinessLoan/BusinessLoan';
import HealthInsurance from './pages/HealthInsurance/HealthInsurance';
import LifeInsurance from './pages/LifeInsurance/LifeInsurance';
import GeneralInsurance from './pages/GeneralInsurance/GeneralInsurance';
import HomeLoan from './pages/HomeLoan/HomeLoan';
import HLBankingPartners from './pages/HomeLoan/HLBankingPartners';
import HLNBFCPartners from './pages/HomeLoan/HLNBFCPartners';
import GoldLoan from './pages/GoldLoan/GoldLoan';
import GLBankingPartners from './pages/GoldLoan/GLBankingPartners';
import LoanAgainstProperty from './pages/LoanAgainstProperty/LoanAgainstProperty';
import AboutUs from './pages/AboutUs/AboutUs';
import Insurance from './pages/Insurance/Insurance';
import Loans from './pages/Loans/Loans';
import Login from './pages/login/Login';
import Apply from './pages/apply/Apply';
import EmployeeLogin from './pages/EmployeeLogin/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import EmployeeLoans from './pages/EmployeeDashboard/EmployeeLoans';
import EmployeeInsurance from './pages/EmployeeDashboard/EmployeeInsurance';
import EmployeeCreditCards from './pages/EmployeeDashboard/EmployeeCreditCards';
import EmployeeDM from './pages/EmployeeDashboard/EmployeeDM';

// Card Pages
import AxisCreditCard from './pages/Cards/AxisCreditCard';
import HDFCCreditCard from './pages/Cards/HDFCCreditCard';
import ICICICreditCard from './pages/Cards/ICICICreditCard';
import IDFCCreditCard from './pages/Cards/IDFCCreditCard';
import IndusIndCreditCard from './pages/Cards/IndusIndCreditCard';

// Personal Loan Partner Pages
import PLBankingPartners from './pages/PersonalLoan/PLBankingPartners';
import PLNBFCPartners from './pages/PersonalLoan/PLNBFCPartners';
import PLFintechPartners from './pages/PersonalLoan/PLFintechPartners';

// Business Loan Partner Pages
import BLBankingPartners from './pages/BusinessLoan/BLBankingPartners';
import BLNBFCPartners from './pages/BusinessLoan/BLNBFCPartners';
import BLFintechPartners from './pages/BusinessLoan/BLFintechPartners';

// Loan Against Property Partner Pages
import LAPBankingPartners from './pages/LoanAgainstProperty/LAPBankingPartners';
import LAPNBFCPartners from './pages/LoanAgainstProperty/LAPNBFCPartners';
import LAPFintechPartners from './pages/LoanAgainstProperty/LAPFintechPartners';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

const MainContent = styled.main`
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Credit Card Routes */}
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/cards/axis-bank" element={<AxisCreditCard />} />
            <Route path="/cards/hdfc-bank" element={<HDFCCreditCard />} />
            <Route path="/cards/icici-bank" element={<ICICICreditCard />} />
            <Route path="/cards/idfc-bank" element={<IDFCCreditCard />} />
            <Route path="/cards/indusind-bank" element={<IndusIndCreditCard />} />
            
            {/* Loan Routes */}
            <Route path="/loans" element={<Loans />} />
            
            {/* Personal Loan Routes */}
            <Route path="/personal-loan" element={<PersonalLoan />} />
            <Route path="/personal-loan/banking-partners" element={<PLBankingPartners />} />
            <Route path="/personal-loan/nbfc-partners" element={<PLNBFCPartners />} />
            <Route path="/personal-loan/fintech-partners" element={<PLFintechPartners />} />
            
            {/* Business Loan Routes */}
            <Route path="/business-loan" element={<BusinessLoan />} />
            <Route path="/business-loan/banking-partners" element={<BLBankingPartners />} />
            <Route path="/business-loan/nbfc-partners" element={<BLNBFCPartners />} />
            <Route path="/business-loan/fintech-partners" element={<BLFintechPartners />} />
            
            {/* Loan Against Property Routes */}
            <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
            <Route path="/loan-against-property/banking-partners" element={<LAPBankingPartners />} />
            <Route path="/loan-against-property/nbfc-partners" element={<LAPNBFCPartners />} />
            <Route path="/loan-against-property/fintech-partners" element={<LAPFintechPartners />} />
            
            {/* Other Routes */}
            <Route path="/home-loan" element={<HomeLoan />} />
            <Route path="/home-loan/banking-partners" element={<HLBankingPartners />} />
            <Route path="/home-loan/nbfc-partners" element={<HLNBFCPartners />} />
            <Route path="/gold-loan" element={<GoldLoan />} />
            <Route path="/gold-loan/banking-partners" element={<GLBankingPartners />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/health-insurance" element={<HealthInsurance />} />
            <Route path="/life-insurance" element={<LifeInsurance />} />
            <Route path="/general-insurance" element={<GeneralInsurance />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/apply" element={<Apply />} />
            
            {/* Employee Dashboard Routes */}
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/loans" element={<EmployeeLoans />} />
            <Route path="/employee/insurance" element={<EmployeeInsurance />} />
            <Route path="/employee/credit-cards" element={<EmployeeCreditCards />} />
            <Route path="/employee/database" element={<EmployeeDM />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
