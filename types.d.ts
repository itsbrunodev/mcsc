export interface IBaseResponse {
  project_id: string;
  project_name: string;
}

export interface IProject extends IBaseResponse {
  version_groups: string[];
  versions: string[];
}

export interface IProjectBuilds extends IBaseResponse {
  version: string;
  builds: number[];
}
