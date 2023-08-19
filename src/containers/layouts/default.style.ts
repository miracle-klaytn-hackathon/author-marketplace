/* LAYOUT DEFAULT COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";

const Styled = {
  Container: styled.div`
    /* max-width: 1440px;
    width: 100%;
    margin: auto; */
  `,

  Main: styled.main`
    width: 100%;
    margin-top: 60px;
    min-height: calc(100vh - 110px);
    background-color: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    padding: 40px 60px;

    .table-enviro {
      box-shadow: none;
      border-radius: initial;
      border: 1px solid ${({ theme }) => theme.colors.blacks20};

      table {
        thead {
          background: ${({ theme }) => theme.colors.blacks10};
          th {
            padding: 20px 30px;
            text-transform: uppercase;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            color: ${({ theme }) => theme.colors.primary};
          }
        }

        tbody {
          tr td {
            padding: 16px 30px;
            border-bottom: 1px solid ${({ theme }) => theme.colors.blacks20};
          }
        }

        tfoot {
          position: relative;
          tr td {
            padding-left: 30px;
            padding-right: 30px;
          }

          .MuiTablePagination-toolbar > div {
            margin: 0 8px;
          }
        }

        .MuiTableFooter-root {
          nav {
            margin-left: 40px;
          }

          .MuiPagination-ul {
            flex-wrap: nowrap;

            & > li {
              margin: 0 3px;
              button {
                min-width: 28px;
                height: 28px;
                margin: 0;

                svg {
                  color: ${({ theme }) => theme.colors.blacks20};
                }
              }
            }
          }
        }
      }
    }

    .date-picker-enviro {
      .react-datepicker-wrapper {
        width: 100%;
        input {
          border: none;
          border-bottom: solid 1px #b3b3b3;
          width: 100%;
          height: 44px;
          outline: none;
          padding-left: 30px;
        }
      }
      .icon-date {
        position: absolute;
        bottom: 11px;
        z-index: 100;
      }
      .react-datepicker__header {
        background: #fff;
        .react-datepicker__current-month {
          color: #59a52c;
        }
      }
      .react-datepicker__day-name {
        color: #59a52c;
      }
      .react-datepicker__day--selected {
        background: #59a52c;
      }
    }

    @media (max-width: 575.98px) {
      padding: 30px;
    }
  `,
};

export default Styled;
