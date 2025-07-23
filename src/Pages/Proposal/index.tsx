import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProposalFormPage = styled.div`
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
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
`;

const UploadArea = styled.div`
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 40px;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    border-color: #0066cc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

const PrimaryButton = styled.button`
  padding: 12px 24px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052a3;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: white;
  color: #333;
  border: 1px solid #ccc;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProposalForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    justification: "",
    methodology: "",
    orientator: "",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proposal submitted successfully!");
    navigate("/dashboard");
  };

  return (
    <ProposalFormPage>
      <Header>
        <Logo>logo</Logo>
        <NavButton onClick={() => navigate(-1)}>Back</NavButton>
      </Header>

      <MainContent>
        <PageTitle>4. Proposal Form</PageTitle>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Summary</FormLabel>
            <FormTextarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Justification</FormLabel>
            <FormTextarea
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Methodology</FormLabel>
            <FormTextarea
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Orientator</FormLabel>
            <FormInput
              type="text"
              name="orientator"
              value={formData.orientator}
              onChange={handleChange}
              placeholder="suggestion"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Upload PDF</FormLabel>
            <UploadArea
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <p>Click to upload PDF</p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {formData.file && <p>{formData.file.name}</p>}
            </UploadArea>
          </FormGroup>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={() => navigate(-1)}>
              Cancel
            </SecondaryButton>
            <SecondaryButton type="submit">Save</SecondaryButton>
            <PrimaryButton type="submit">Send</PrimaryButton>
          </ButtonGroup>
        </form>
      </MainContent>
    </ProposalFormPage>
  );
};

export default ProposalForm;
