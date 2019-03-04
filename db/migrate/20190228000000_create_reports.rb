class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.jsonb 'name_i18n'
      t.jsonb 'description_i18n'
      t.string 'module_ids', array: true, default: []
      t.string 'record_type'
      t.string 'aggregate_by', array: true, default: []
      t.string 'disaggregate_by', array: true, default: []
      t.string 'aggregate_counts_from'
      t.jsonb 'filters', array: true, default: []
      t.boolean 'group_ages', null: false, default: false
      t.string 'group_dates_by', default: 'date'
      t.boolean 'is_graph', null: false, default: false
      t.boolean 'editable', null: true, default: true
      t.string 'base_language', default: Primero::Application::LOCALE_ENGLISH
    end

  end
end
# 12345678910111213