import * as actions from "../../action-creators";
import * as selectors from "../../selectors";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useI18n } from "components/i18n";
import { OptionsBox } from "components/dashboard";
import { DateRangeSelect, CommonDateRanges, SingleAggregateMetric } from "components/key-performance-indicators";

function AverageReferrals({ fetchAverageReferrals, averageReferrals }) {
  let i18n = useI18n();
  let commonDateRanges = CommonDateRanges.from(new Date());

  let dateRanges = [
    commonDateRanges.AllTime
  ]

  let [currentDateRange, setCurrentDateRange] = useState(dateRanges[0]);

  useEffect(() => {
    fetchAverageReferrals(currentDateRange);
  }, [currentDateRange]);

  return (
    <OptionsBox
      title={i18n.t('key_performance_indicators.average_referrals.title')}
      action={
        <DateRangeSelect
          ranges={dateRanges}
          selectedRange={currentDateRange}
          setSelectedRange={setCurrentDateRange}
          withCustomRange
          disabled
        />
      }
    >
      <SingleAggregateMetric
        value={averageReferrals.get('data').get('average_referrals')}
        label={i18n.t('key_performance_indicators.average_referrals.label')}
      />
    </OptionsBox>
  );
}

const mapStateToProps = state => {
  return {
    averageReferrals: selectors.averageReferrals(state)
  };
};

const mapDispatchToProps = {
  fetchAverageReferrals: actions.fetchAverageReferrals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AverageReferrals);
