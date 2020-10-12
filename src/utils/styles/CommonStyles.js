import styled from "styled-components";

export const alertDanger = {
  backgroundColor: "#f8d7da",
  color: "#A94442",
  border: "1px solid #EBCCD1",
};

export const CustomTableStyles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 1;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
