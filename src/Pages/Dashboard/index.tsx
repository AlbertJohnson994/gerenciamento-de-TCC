// import React from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const DashboardPage = styled.div`
//   min-height: 100vh;
//   background-color: #f5f5f5;
//   font-family: Arial, sans-serif;
// `;

// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   padding: 20px;
//   background-color: white;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const NavButton = styled.button`
//   background: none;
//   border: none;
//   color: #0066cc;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 500;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
// `;

// const MainContent = styled.div`
//   max-width: 1200px;
//   margin: 30px auto;
//   padding: 20px;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const RoleBadge = styled.span`
//   background-color: #e0e0e0;
//   padding: 5px 10px;
//   border-radius: 20px;
//   font-size: 14px;
// `;

// const PageTitle = styled.h1`
//   font-size: 24px;
//   margin-bottom: 30px;
// `;

// const ProposalCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   margin-bottom: 20px;
// `;

// const StatusBadge = styled.span<{ status: string }>`
//   display: inline-block;
//   padding: 5px 10px;
//   border-radius: 4px;
//   font-size: 14px;
//   background-color: ${(props) =>
//     props.status === "Approved"
//       ? "#d4edda"
//       : props.status === "Rejected"
//       ? "#f8d7da"
//       : "#fff3cd"};
//   color: ${(props) =>
//     props.status === "Approved"
//       ? "#155724"
//       : props.status === "Rejected"
//       ? "#721c24"
//       : "#856404"};
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const ActionButton = styled.button<{ variant?: "outline" }>`
//   padding: 8px 16px;
//   border-radius: 4px;
//   font-size: 14px;
//   cursor: pointer;
//   border: 1px solid
//     ${(props) => (props.variant === "outline" ? "#ccc" : "#0066cc")};
//   background-color: ${(props) =>
//     props.variant === "outline" ? "transparent" : "#0066cc"};
//   color: ${(props) => (props.variant === "outline" ? "#333" : "white")};

//   &:hover {
//     background-color: ${(props) =>
//       props.variant === "outline" ? "#f0f0f0" : "#0052a3"};
//   }
// `;

// const Dashboard: React.FC = () => {
//   const user = useSelector((state: RootState) => state.user);
//   const navigate = useNavigate();

//   // Sample proposal data
//   const proposals = [
//     {
//       title: "Research Project on AI Ethics",
//       status: "Pending",
//       date: "2023-05-15",
//     },
//     {
//       title: "Campus Sustainability Initiative",
//       status: "Approved",
//       date: "2023-04-28",
//     },
//     {
//       title: "Student Workshop Series",
//       status: "Rejected",
//       date: "2023-03-10",
//     },
//   ];

//   return (
//     <DashboardPage>
//       <Header>
//         <Logo>logo</Logo>
//         <NavButton onClick={() => navigate(-1)}>Back</NavButton>
//       </Header>

//       <MainContent>
//         <UserInfo>
//           <RoleBadge>3. student</RoleBadge>
//           <h2>Dashboard</h2>
//         </UserInfo>

//         <PageTitle>Nova proposta</PageTitle>

//         {proposals.map((proposal, index) => (
//           <ProposalCard key={index}>
//             <h3>{proposal.title}</h3>
//             <div>
//               <strong>Status:</strong>{" "}
//               <StatusBadge status={proposal.status}>
//                 {proposal.status}
//               </StatusBadge>
//             </div>
//             <div>
//               <strong>Date sent:</strong> {proposal.date}
//             </div>
//           </ProposalCard>
//         ))}

//         <ButtonGroup>
//           <ActionButton variant="outline" onClick={() => navigate(-1)}>
//             cancel
//           </ActionButton>
//           <ActionButton onClick={() => alert("Creating new proposal...")}>
//             next
//           </ActionButton>
//           <ActionButton onClick={() => alert("Creating new proposal...")}>
//             Nova proposta
//           </ActionButton>
//         </ButtonGroup>
//       </MainContent>
//     </DashboardPage>
//   );
// };

// export default Dashboard;

import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DashboardPage = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const RoleBadge = styled.span`
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
`;

const ProposalCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${(props) =>
    props.status === "Approved"
      ? "#d4edda"
      : props.status === "Rejected"
      ? "#f8d7da"
      : "#fff3cd"};
  color: ${(props) =>
    props.status === "Approved"
      ? "#155724"
      : props.status === "Rejected"
      ? "#721c24"
      : "#856404"};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ variant?: "outline" }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.variant === "outline" ? "#ccc" : "#0066cc")};
  background-color: ${(props) =>
    props.variant === "outline" ? "transparent" : "#0066cc"};
  color: ${(props) => (props.variant === "outline" ? "#333" : "white")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "outline" ? "#f0f0f0" : "#0052a3"};
  }
`;

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // Sample proposal data - now using the user's name from Redux
  const proposals = [
    {
      title: "Research Project on AI Ethics",
      status: "Pending",
      date: "2023-05-15",
    },
    {
      title: "Campus Sustainability Initiative",
      status: "Approved",
      date: "2023-04-28",
    },
    {
      title: "Student Workshop Series",
      status: "Rejected",
      date: "2023-03-10",
    },
  ];

  return (
    <DashboardPage>
      <Header>
        <Logo>logo</Logo>
        <NavButton onClick={() => navigate(-1)}>Back</NavButton>
      </Header>

      <MainContent>
        <UserInfo>
          <RoleBadge>
            {user.roleNumber}. {user.role}
          </RoleBadge>
          <h2>Dashboard</h2>
        </UserInfo>

        <PageTitle>New Proposal</PageTitle>

        {proposals.map((proposal, index) => (
          <ProposalCard key={index}>
            <h3>{proposal.title}</h3>
            <div>
              <strong>Status:</strong>{" "}
              <StatusBadge status={proposal.status}>
                {proposal.status}
              </StatusBadge>
            </div>
            <div>
              <strong>Date sent:</strong> {proposal.date}
            </div>
          </ProposalCard>
        ))}

        <ButtonGroup>
          <ActionButton variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </ActionButton>
          <ActionButton
            onClick={() => navigate("/")} // Redirect to home or next step
          >
            Finish
          </ActionButton>
          <ActionButton onClick={() => navigate("/proposal")}>
            New Proposal
          </ActionButton>
        </ButtonGroup>
      </MainContent>
    </DashboardPage>
  );
};

export default Dashboard;
