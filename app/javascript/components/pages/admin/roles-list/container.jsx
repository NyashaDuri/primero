import { List } from "immutable";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";

import { useI18n } from "../../../i18n";
import IndexTable from "../../../index-table";
import { PageHeading, PageContent } from "../../../page";
import { ROUTES } from "../../../../config";
import { NAMESPACE } from "../roles-form";
import { getMetadata } from "../../../record-list";
import ActionButton from "../../../action-button";
import { ACTION_BUTTON_TYPES } from "../../../action-button/constants";
import { RESOURCES, CREATE_RECORDS } from "../../../../libs/permissions";
import { useMetadata } from "../../../records";
import usePermissions from "../../../permissions";
import { useApp } from "../../../application";
import { useMemoizedSelector } from "../../../../libs";
import { getFilters } from "../agencies-list/utils";
import { FiltersForm } from "../../../form-filters/components";

import { fetchRoles } from "./action-creators";
import { ADMIN_NAMESPACE, LIST_HEADERS, NAME } from "./constants";

const Container = () => {
  const i18n = useI18n();
  const dispatch = useDispatch();
  const { limitedProductionSite } = useApp();
  const recordType = RESOURCES.roles;

  const defaultFilterFields = {
    disabled: ["false"]
  };
  const columns = LIST_HEADERS.map(({ label, ...rest }) => ({
    label: i18n.t(label),
    ...rest
  }));
  const metadata = useMemoizedSelector(state => getMetadata(state, "roles"));

  const defaultFilters = metadata.merge(defaultFilterFields);
  const canAddRoles = usePermissions(NAMESPACE, CREATE_RECORDS);
  const rolesNewButton = canAddRoles && (
    <ActionButton
      icon={<AddIcon />}
      text={i18n.t("buttons.new")}
      type={ACTION_BUTTON_TYPES.default}
      rest={{
        to: ROUTES.admin_roles_new,
        component: Link,
        hide: limitedProductionSite
      }}
    />
  );

  useMetadata(recordType, metadata, fetchRoles, "data", { defaultFilterFields });

  const onSubmit = data => {
    const setDefaultFilters = isEmpty(data) ? defaultFilterFields : {};

    dispatch(fetchRoles({ data: { ...data, ...setDefaultFilters } }));
  };

  const filterProps = {
    clearFields: ["disabled"],
    filters: getFilters(i18n),
    onSubmit,
    defaultFilters,
    initialFilters: defaultFilterFields
  };

  const tableOptions = {
    recordType: [ADMIN_NAMESPACE, NAMESPACE],
    columns: List(columns),
    options: {
      selectableRows: "none"
    },
    defaultFilters,
    onTableChange: fetchRoles,
    targetRecordType: NAMESPACE,
    bypassInitialFetch: true
  };

  return (
    <>
      <PageHeading title={i18n.t("roles.label")}>{rolesNewButton}</PageHeading>
      <PageContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <IndexTable title={i18n.t("roles.label")} {...tableOptions} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FiltersForm {...filterProps} />
          </Grid>
        </Grid>
      </PageContent>
    </>
  );
};

Container.displayName = NAME;

export default Container;
