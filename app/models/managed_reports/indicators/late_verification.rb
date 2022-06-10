# frozen_string_literal: true

# An indicator that returns the type of use of violation type Recruitment
class ManagedReports::Indicators::LateVerification < ManagedReports::SqlReportIndicator
  include ManagedReports::GhnIndicatorHelper

  class << self
    def id
      'late_verification'
    end

    # rubocop:disable Metrics/MethodLength
    def sql(current_user, params = {})
      %{
        select key as name, 'total' as key,
        violations.data ->> 'type' as group_id,
        sum(value::int)
        from violations violations
        inner join incidents incidents
          on incidents.id = violations.incident_id
          #{user_scope_query(current_user, 'incidents')&.prepend('and ')}
        cross join json_each_text((violations.data->>'violation_tally')::JSON)
        WHERE violations.data->>'violation_tally' is not null
        and violations.data->>'is_late_verification' = 'true'
        #{date_range_query(date_filter_param(params['ghn_date_filter']), 'violations')&.prepend('and ')}
        group by key, violations.data ->> 'type'
        #{grouped_date_query(params['grouped_by'], filter_date(params), table_name_for_query(params))&.prepend(', ')}
        order by
        name
      }
    end

    def date_filter
      'ctfmr_verified_date'
    end

    # rubocop:enable Metrics/MethodLength
    # rubocop:enable Metrics/AbcSize
    # rubocop:enable Metrics/CyclomaticComplexity
    # rubocop:enable Metrics/PerceivedComplexity
  end
end