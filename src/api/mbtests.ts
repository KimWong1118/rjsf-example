import axios, { CancelToken } from "axios";
//import { Configuration, MbtestsApi } from './codegen';

//export type { MbtestIn, MBTestReviewIn, MBTestReviewOut } from './codegen';

/* const configuration = new Configuration({
    basePath: window.location.origin,
}); */

//export const mbtestsServiceV2 = new MbtestsApi(configuration);

export interface IMBTest {
  id: string;
  start_time: string;
  end_time?: string;
  test_status: string;
  cost: number;
  datarobot_commit: string;
  datarobot_release_version: string;
  description?: string;
  jenkins_build_uri: string;
  launch_type: string;
  platform: string;
  metablueprint: string;
  tags?: string[];
  followers: string[];
  parent_mbtest_id?: string;
  shrink_sha: string;
  entrypoints?: {
    datarobot_app_uri: string;
    mongo_uri: string;
  };
  original_dataset_list_config_name: string;
  projects?: {
    completed: number;
    failed: number;
    total: number;
  };
  credentials?: {
    username: string;
    password: string;
  };
  user: {
    id: string;
    username: string;
  };
  domain?: {
    id: string;
    name: string;
  };
  timer_test?: {
    id: string;
    title: string;
  };
  release_test?: {
    id: string;
    title: string;
  };
  cluster?: {
    id: string;
    drca_cluster_id: string;
  };
  disable_termination: boolean;
  options?: Record<string, any>;
  kibana_uri?: string;
}

export interface IPredictionConsistencyModel {
  drivers: string[];
  error: string | null;
  model: {
    id: string;
    model_type: string;
  };
  model_type: string;
}

export interface IPredictionConsistencyTests {
  failed?: IPredictionConsistencyModel[];
  skipped?: IPredictionConsistencyModel[];
  success?: IPredictionConsistencyModel[];
}

export interface IBPSearchResults {
  models_count: number;
  p1_result: string[];
  holdout_result: string[];
  p1_improved: boolean;
  holdout_improved: boolean;
}

export interface IMBTestProject {
  id: string;
  mbtest_id: string;
  datarobot_project_id: string;
  datarobot_release_version: string;
  project_datarobot_app_url?: string;
  status: string;
  models_count: number;
  model_codegen_count: number;
  bp_search_results: IBPSearchResults;
  model_primes_count: number;
  dataset_name: string;
  jdbc_params: Record<string, any>;
  dataset_yaml: Record<string, any>;
  target: string;
  metric: string;
  error_msg: string;
  rating_table_metrics_mismatch: boolean;
  models_without_feature_impact: [];
  anomaly_detection_table_retrieval_error: string;
  model_blenders_count: number;
  feature_impact: Record<string, any>;
  feature_impact_results_error: Record<string, any>;
  feature_drift: Record<string, any>;
  target_drift: Record<string, any>;
  data_details: Record<string, any>;
  deployment_stats: Record<string, any>;
  accuracy_details: Record<string, any>;
  accuracy_metric_errors: Record<string, any>;
  model_errors_count: number;
  task_errors_count: number;
  prediction_consistency_tests?: IPredictionConsistencyTests;
  begin_time?: string | null;
  end_time?: string | null;
  errored_models: Record<string, any>[];
  errored_tasks: Record<string, any>[];
  kibana_uri?: string;
  jira_tickets?: string[];
}

export interface IMbtestListFilters {
  limit?: string | number;
  offset?: string | number;
  username?: string;
  mbtest_status?: string;
  launch_type?: string;
  platform?: string;
  cluster_id?: string;
  metablueprint?: string;
  tags?: string | string[];
  original_dataset_list_config_name?: string;
  domain_name?: string | string[];
  user_id?: string;
  domain_id?: string;
  timer_test_id?: string;
  release_test_id?: string;
}

export interface MetaLearningDevNode {
  enabled: boolean; // false
  meta_learning_sha: string; // 'origin/main'
  instance_type: string; // 'r5.8xlarge'
  instance_boot_volume: number; // 50
  api_port: number; // 5301
  digest_limit: number; // 150000
  digest_name: string; // 'shrink-mbtest'
}

export interface IAWSClusterParams {
  drenv_overrides?: string; // ''
  enable_python3: boolean; // true
  workers_type: string; // 'small'
  workers_count: number; // 0
  eda_workers_count: number; // 0
  prediction_workers_count: number; // 0
  disable_termination: boolean; // False
  lifetime_hours: number; // 72
  can_use_spot: boolean; // True
  drca_pipeline_overrides: string; // '{}'
  terminate_pipeline_overrides: string; // '{}'
  launch_type?: string; // 'aws'
  // Properties that represented as metadata
  platform?: string; // 'dockerized'
  dr_platform_type: string; // 'enterprise-cloud'
  datarobot_artifact?: string; // 'latest_dockerized_stable'
  datarobot_commit?: string; // 'origin/master'
  bundle_version?: string; // ''
  csd_version?: string; // ''
  dr_parcel?: string; // ''
  drkar_artifacts_version?: string; // ''
  metablueprint?: string; // ''
  // <--
  dynamic_scaling: boolean; // True
  enable_yarn_overbooking: boolean; // True
  disable_eda_dynamic_scaling: boolean; // False
  enable_metalearning_api: boolean; // False
  // Stackbot related
  metadata_json_overrides: string; // '{}'
  // tshirt
  tshirt_size: string;
  // k8s
  k8s_nodes: number;
  can_use_spot_for_webserver_components: boolean;
  can_use_spot_for_worker_components: boolean;
  enable_cluster_autoscaler: boolean;
  webserver_instance_type: string; // r4.xlarge
  meta_learning_dev_node: MetaLearningDevNode;
}

export interface IPredictionConsistencyTestingOptions {
  enable_prediction_explanations_consistency_testing: boolean; // False
  enable_extended_prediction_model_list: boolean; // False
}

export interface IPredictionConsistencyTestingDrivers {
  prediction_deployments_driver: boolean; // False
  scoring_code_driver: boolean; // False
  spark_160_scoring_code_driver: boolean; // False
  pyspark_160_scoring_code_driver: boolean; // False
  spark_243_scoring_code_driver: boolean; // False
  pyspark_243_scoring_code_driver: boolean; // False
  pyspark_300_scoring_code_driver: boolean; // False
  spark_300_scoring_code_driver: boolean; // False
  snowflake_scoring_code_driver: boolean; // False
  prime_drivers: boolean; // False
  batch_prediction_driver: boolean; // False
  batch_prediction_leaderboard_driver: boolean; // False
  deployments_feature_cache_driver: boolean; // False
  pps_driver: boolean; // False
  batch_pps_driver: boolean; // False
  low_latency_prediction_driver: boolean; // False
  segmentation_prediction_driver: boolean; // False
}

export interface IMBTestParams {
  additional_permissions?: string[]; // config.ADDITIONAL_PERMISSIONS
  dataset_list_data?: string; // ''
  original_dataset_list_config_name?: string; // ''
  predefined_dataset?: string; // ''
  datasets?: any[];
  enable_autopilot_rerun?: boolean; // False
  api_max_wait: number; // 0
  prime: boolean; // False
  prime_validation: boolean; // False
  prime_strategy: string; // 'APPROXIMATE_TOP_N_MODELS'
  prime_strategy_n: number; // 1
  autopilot_setting?: string; // 'FULL_AUTOPILOT'
  accuracy_optimized_mb: boolean; // False
  final_model_sample_pct: number; // 95
  run_all_repository_blueprints: boolean; // False
  enable_feature_impact: boolean; // False
  enable_model_xray_testing: boolean; // False
  enable_anomaly_detection_table_testing: boolean; // False
  enable_retrain_best_models_at_max_sample: boolean; // False
  enable_profit_curve_calculation: boolean; // False
  profit_curve_top_n_models: number; // 1
  feature_impact_top_n_models: number; // 1
  enable_custom_sample_size: boolean; // False
  feature_impact_sample_size: number; // 100
  enable_optimized_partitioning: boolean; // True
  concurrent_projects: number; // 50
  rating_table_validation: boolean; // False
  model_deployment_testing_options: {
    test_monitoring_and_management: boolean; // False
    test_bias_and_fairness_monitoring_and_management: boolean; // False
    test_model_deployment_retraining: boolean; // False
    test_accuracy_metrics_against_reference_values: boolean; // False
  };
  projects_type: string; // 'All'
  autopilot_run_options: {
    scoring_code_only: boolean; // false
    blend_best_models: boolean; // false;
    shap_only_mode: boolean; // false
    prepare_model_for_deployment: boolean; // false
    min_secondary_validation_model_count: number; // 0
    autopilot_setting?: string;
  };
  autopilot_rerun_options: {
    enable_autopilot_rerun?: boolean; // False
    featurelist: string; // "Informative"
    modeling_mode: string; // "AUTO"
    scoring_code_only: boolean; // false
    blend_best_models: boolean; // true
    prepare_model_for_deployment: boolean; // true
  };
  time_series_options: {
    compute_all_series: boolean; // false
    skip_accuracy_over_time_computing: boolean; // false
  };
  shap_options: {
    feature_impact: boolean; // false
    prediction_explanations: boolean; // false
    prediction_explanations_preview: boolean; // false
    training_prediction_explanations: boolean; // false
  };
  image_augmentation_options: IImageAugmentation;
  enable_feature_discovery: boolean; // False
  enable_external_scoring: boolean; // False
  skip_yaml_blueprints: boolean; // False
  test_regression: boolean; // False
  prediction_consistency_testing_options: IPredictionConsistencyTestingOptions;
  prediction_consistency_drivers: IPredictionConsistencyTestingDrivers;
  make_blender_from_final_pct_models: boolean; // False
}

export interface IPermissions {
  additional_permissions?: string[];
}

export interface ICustomClusterParams {
  datarobot_app_uri: string; // 'http://127.0.0.1/'
  mongo_uri: string; // 'mongodb://127.0.0.1/MMApp'
  prediction_api_url: string; // 'http://127.0.0.1/predApi/v1.0'
}

export interface IMBTestJSONFormSchema {
  AWSClusterParams: IAWSClusterParams;
  MBTestParams: IMBTestParams;
  permissions: IPermissions;
}

export interface IImageAugmentation {
  name: string;
  transformation_probability: number;
  number_of_new_images: number;
  transformations: object[];
}

export interface IMBTestMetadata {
  datarobot_release_version: string; // 'origin/master'
  tags: string[]; // []
  artifact_type: string; // 'new'
  description: string; // ''
  shrink_sha: string; // 'origin/master'
}

export interface IPredefinedDataset {
  type: "predefined";
  predefined_dataset?: string;
}

export interface IUploadedDataset {
  type: "upload";
  dataset_list_and_config_name?: string;
  dataset_list_data?: string;
  original_dataset_list_config_name?: string;
}

export interface IIncompleteProjectsDataset {
  type: "incomplete";
  incomplete_dataset_list_and_config_name?: string;
  dataset_list_data?: string;
  original_dataset_list_config_name?: string;
}

export interface IMBTestSchema
  extends IMBTestJSONFormSchema,
    IMBTestMetadata,
    ICustomClusterParams {
  launch_type?: string;
  platform?: string; // 'dockerized'
  datarobot_artifact?: string; // 'latest_dockerized_stable'
  datarobot_commit?: string; // 'origin/master'
  bundle_version?: string; // ''
  csd_version?: string; // ''
  dr_parcel?: string; // ''
  drkar_artifacts_version?: string; // ''
  metablueprint?: string; // ''
  skip_yaml_blueprints?: boolean; // false
  datasetParams:
    | IPredefinedDataset
    | IUploadedDataset
    | IIncompleteProjectsDataset;
}

export interface IMBTestFlatSchema
  extends IMBTestMetadata,
    IAWSClusterParams,
    IMBTestParams,
    IPermissions,
    IPredictionConsistencyTestingOptions,
    ICustomClusterParams {}

export interface IMbtestListRequestConfig {
  params: IMbtestListFilters;
  cancelToken?: CancelToken;
}

export interface IMbtestListResponse {
  data: IMBTest[];
  total: number;
}

const MBTEST_API_URI = "/api/v2/mbtests";

export default {
  getList: (config: IMbtestListRequestConfig) =>
    axios.get<IMbtestListResponse>(`${MBTEST_API_URI}`, config),
  getDefaultParams: () =>
    axios.get<IMBTestFlatSchema>(`${MBTEST_API_URI}/params_default`),
  getMbtestById: (id: string, include_projects?: boolean) =>
    axios.get<IMBTest>(`${MBTEST_API_URI}/${id}`, {
      params: { include_projects }
    }),
  getMbtestProjectList: (id: string) =>
    axios.get<IMBTestProject[]>(`${MBTEST_API_URI}/${id}/projects`),
  getMbtestParamsById: (id: string) =>
    axios.get<IMBTestFlatSchema>(`${MBTEST_API_URI}/${id}/params_rerun`),
  getIncompleteProjects: (id: string) =>
    axios.get<string>(`${MBTEST_API_URI}/${id}/incomplete_projects.yaml`),
  create: (data: IMBTestFlatSchema) =>
    axios.post<{ location: string }>(`${MBTEST_API_URI}/create`, data)
};
