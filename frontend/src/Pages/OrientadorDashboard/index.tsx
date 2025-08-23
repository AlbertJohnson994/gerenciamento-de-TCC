import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OrientatorDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  // Sample proposal data
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "AI Research Project",
      student: "John Doe",
      date: "2023-06-15",
      status: "pending",
    },
    {
      id: 2,
      title: "Sustainability Initiative",
      student: "Jane Smith",
      date: "2023-06-10",
      status: "approved",
    },
    {
      id: 3,
      title: "Student Workshop",
      student: "Alex Johnson",
      date: "2023-06-05",
      status: "rejected",
    },
  ]);

  const filteredProposals =
    statusFilter === "all"
      ? proposals
      : proposals.filter((p) => p.status === statusFilter);

  const handleStatusChange = (proposalId: number, newStatus: string) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId ? { ...p, status: newStatus } : p
      )
    );
    setSelectedProposal(null);
    setFeedback("");
  };

  return (
    <DashboardContainer>
      <Header>
        <Logo>logo</Logo>
        <NavButton onClick={() => navigate(-1)}>Back</NavButton>
      </Header>

      <MainContent>
        <DashboardHeader>
          <h2>4. Orientator</h2>
          <h1>Dashboard</h1>
        </DashboardHeader>

        <SectionTitle>Proposals received</SectionTitle>

        <FilterContainer>
          <FilterLabel>Status Filter</FilterLabel>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </FilterSelect>
        </FilterContainer>

        <ProposalsList>
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              onClick={() => setSelectedProposal(proposal.id)}
              isSelected={selectedProposal === proposal.id}
            >
              <ProposalTitle>{proposal.title}</ProposalTitle>
              <ProposalMeta>
                <span>Student: {proposal.student}</span>
                <span>Date: {proposal.date}</span>
                <StatusBadge status={proposal.status}>
                  {proposal.status}
                </StatusBadge>
              </ProposalMeta>
            </ProposalCard>
          ))}
        </ProposalsList>

        {selectedProposal && (
          <ActionSection>
            <SectionTitle>Proposal action</SectionTitle>
            <FeedbackArea
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <ButtonGroup>
              <ActionButton
                variant="approve"
                onClick={() => handleStatusChange(selectedProposal, "approved")}
              >
                Approved
              </ActionButton>
              <ActionButton
                variant="adjust"
                onClick={() =>
                  handleStatusChange(selectedProposal, "adjustment")
                }
              >
                Request Adjustment
              </ActionButton>
              <ActionButton
                variant="reject"
                onClick={() => handleStatusChange(selectedProposal, "rejected")}
              >
                Rejected
              </ActionButton>
            </ButtonGroup>
          </ActionSection>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
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

const DashboardHeader = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 20px;
    color: #666;
    margin-bottom: 5px;
  }

  h1 {
    font-size: 28px;
    color: #333;
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ProposalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

const ProposalCard = styled.div<{ isSelected: boolean }>`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-left: 4px solid
    ${(props) => (props.isSelected ? "#0066cc" : "transparent")};
  background-color: ${(props) => (props.isSelected ? "#f0f7ff" : "white")};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProposalTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #333;
`;

const ProposalMeta = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #666;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${(props) =>
    props.status === "approved"
      ? "#28a745"
      : props.status === "rejected"
      ? "#dc3545"
      : "#ffc107"};
`;

const ActionSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeedbackArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{
  variant: "approve" | "adjust" | "reject";
}>`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  background-color: ${(props) =>
    props.variant === "approve"
      ? "#28a745"
      : props.variant === "adjust"
      ? "#ffc107"
      : "#dc3545"};

  &:hover {
    opacity: 0.9;
  }
`;

export default OrientatorDashboard;
