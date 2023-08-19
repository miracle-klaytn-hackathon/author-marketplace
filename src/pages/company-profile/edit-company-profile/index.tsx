import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Styled } from "./edit.company-profile.style";
import { initValueCompany } from "pages/sign-up/SignUp";
import { schemaCompanyInfo } from "utils/yupSchema";
import TextField from "components/text-field/text-field";
import { ReactComponent as IconSortAlfa } from "assets/images/Sort_alfa.svg";
import { ReactComponent as IconLink } from "assets/images/link.svg";
import { ReactComponent as IconWorldLight } from "assets/images/world_2_light.svg";
import { ReactComponent as IconChart } from "assets/images/Chart_alt.svg";
import SelectField from "components/select-field/select-field";
import { optionsSize } from "pages/sign-up/FormCompanyInfo";
import TableEdit from "./TableEdit";
import {
  PageSize,
  getCompanyInfo,
  updateCompanyProfile,
} from "api/post/companyProfile.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import ModalConfirm from "components/modal/ModalConfirm";
import { TStore, actions, useDispatch, useSelector } from "store";

export interface CompanyFacility {
  id?: number | string;
  name: string;
  status: "INACTIVE" | "ACTIVE";
  isValid?: boolean;
  new?: boolean;
  createdBy?: null;
  updatedBy?: null;
  createdDate?: null;
  updatedDate?: null;
  totalRecords?: number;
  delete?: boolean;
  message?: string;
}

export interface Pagination {
  page: number;
  size: number;
  totalPage: number;
  totalSize: number;
}

const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const [isDiscard, setIsDiscard] = useState(false);
  const [companyInfoDefault, setCompanyInfoDefault] =
    useState(initValueCompany);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    size: 10,
    totalPage: 1,
    totalSize: 0,
  });
  const [dataTable, setDataTable] = useState<CompanyFacility[]>([]);
  const dispatch = useDispatch();
  const { listCountry, error: errMessage } = useSelector(
    (state: TStore) => state.country
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: companyInfoDefault,
    validationSchema: schemaCompanyInfo,
    enableReinitialize: true,
    onSubmit: () => {
      return;
    },
  });

  useEffect(() => {
    dispatch(actions.country.getCountryName());
  }, [dispatch]);

  useEffect(() => {
    errMessage && toast.error(errMessage);
  }, [errMessage]);

  const handleValidateTable = () => {
    let isValid = false;
    const newDataTable = [...dataTable].map((item) => {
      if (!item.name) isValid = true;

      return {
        ...item,
        isValid: !item.name,
      };
    });

    setDataTable(newDataTable);
    return isValid;
  };

  const handleUpdate = () => {
    handleSubmit();
    const isValid = handleValidateTable();

    if (isValid || Object.keys(errors).length) {
      const section = document.getElementById("message-error");
      section &&
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const newData = dataTable.map((item) => {
      if (item?.new) {
        return {
          name: item.name,
          status: item.status,
          totalRecords: item.totalRecords,
        };
      }

      return {
        id: item.id,
        name: item.name,
        status: item.status,
        delete: item.delete,
        totalRecords: item.totalRecords,
      };
    });

    const paramsQuery = {
      companyName: values.companyName,
      companyCountry: values.origin,
      companyWebsite: values.website,
      size: values.size,

      companyFacilityProfileRequests: newData,
    };

    updateCompanyProfile(paramsQuery)
      .then((res: any) => {
        if (res?.statusCode === 200) {
          toast.success(res?.message || "Update Successful");
          navigate(ROUTES.companyProfile);
          return;
        }
        toast.error(res?.message || "Something Wen Wrong!");
      })
      .catch((err: any) => {
        toast.error(err?.message || "Something Wen Wrong!");
      });
  };

  const handleChangeDataTable = (data: CompanyFacility[]) => {
    setDataTable(data);
  };

  const handleGetInfoCompany = (payload: PageSize) => {
    getCompanyInfo(payload)
      .then((res) => {
        if (res?.statusCode === 200) {
          const { companyFacilities, companyProfile } = res.data;
          setDataTable(companyFacilities.data);
          setCompanyInfoDefault((value) => ({
            ...value,
            companyName: companyProfile.name,
            size: companyProfile.size,
            website: companyProfile.website,
            origin: companyProfile.countryName,
          }));
          setPagination({
            page: companyFacilities.page,
            size: companyFacilities.page_size,
            totalPage: companyFacilities.total_page,
            totalSize: companyFacilities.total_item,
          });

          return;
        }

        toast.error(res?.message || "Something Wen Wrong!");
      })
      .catch((err) => {
        toast.error(err?.message || "Something Wen Wrong!");
      });
  };

  useEffect(() => {
    handleGetInfoCompany({ page: pagination.page, size: pagination.size });
  }, [pagination.page, pagination.size]);

  return (
    <Styled.Container>
      <Styled.WrapCompanyProfile>
        <Styled.WrapTitle>
          <Styled.Title>COMPANY PROFILE</Styled.Title>
          <Styled.Space>-</Styled.Space>
          <Styled.SubTitle>Edit</Styled.SubTitle>
        </Styled.WrapTitle>

        <Styled.WrapForm>
          <Styled.Form onSubmit={handleSubmit}>
            <TextField
              placeholder="Enter your company name"
              value={values.companyName}
              label="Company Name"
              onChange={handleChange}
              // onBlur={handleBlur}
              name="companyName"
              prefix={<IconSortAlfa />}
              requited={true}
              isError={!!(errors.companyName && touched.companyName)}
              error={errors.companyName || ""}
            />

            <SelectField
              placeholder="Select Country"
              label="Company Country"
              name="origin"
              prefix={<IconWorldLight />}
              value={values.origin}
              options={listCountry?.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={(value: string) => {
                setFieldValue("origin", value);
                // setFieldTouched("origin", true);
              }}
              requited={true}
              isError={!!(errors.origin && touched.origin)}
              error={errors.origin || ""}
            ></SelectField>

            <TextField
              placeholder="Enter your company website"
              value={values.website}
              label="Company Website"
              onChange={handleChange}
              name="website"
              prefix={<IconLink />}
              requited={true}
              isError={!!(errors.website && touched.website)}
              error={errors.website || ""}
            />
            <SelectField
              placeholder="Choose your company size"
              value={values.size}
              label="Company Size"
              onChange={(value: string) => {
                setFieldValue("size", value);
                setFieldTouched("size", true);
              }}
              options={optionsSize}
              name="size"
              prefix={<IconChart />}
            />
          </Styled.Form>
        </Styled.WrapForm>
      </Styled.WrapCompanyProfile>

      <Styled.CompanyFacility>
        <Styled.WrapTitle>
          <Styled.Title>COMPANY PROFILE</Styled.Title>
          <Styled.Space>-</Styled.Space>
          <Styled.SubTitle>Edit</Styled.SubTitle>
        </Styled.WrapTitle>

        <Styled.WrapTables>
          <TableEdit
            data={dataTable}
            onChangeDataTable={handleChangeDataTable}
            pagination={pagination}
            onPagination={setPagination}
          ></TableEdit>
          {/* {!!dataTable.length && (
            <Styled.WrapButton>
              <Styled.AddFacility
                onClick={handleAddFacility}
                white
                icon={<IconPlus />}
                text="Add Facility"
              />
            </Styled.WrapButton>
          )} */}
        </Styled.WrapTables>
      </Styled.CompanyFacility>

      <Styled.GroupButton>
        <Styled.BtnDiscard onClick={() => setIsDiscard(true)}>
          Discard
        </Styled.BtnDiscard>
        <Styled.BtnUpdate text="Update" onClick={handleUpdate} />
      </Styled.GroupButton>
      <ModalConfirm
        open={isDiscard}
        title="Confirmation"
        content="Your progress on this input will be lost. Do you want to proceed?"
        onClose={() => setIsDiscard(false)}
        onConfirmation={() => {
          setIsDiscard(true);
          navigate(ROUTES.companyProfile);
        }}
      ></ModalConfirm>
    </Styled.Container>
  );
};

export default EditCompanyProfile;
