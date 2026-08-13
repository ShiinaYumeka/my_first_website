export interface GithubOrganization {
  login: string
  description: string
  html_url: string
  avatar_url: string
}

export interface GithubRepository {
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  visibility: string
  stargazers: number
  forks: number
  fork: boolean
  archived: boolean
  pushed_at: string
  updated_at: string
}

export interface ContributionDay {
  date: string
  contribution_count: number
  color: string
  weekday: number
}

export interface ContributionWeek {
  first_day: string
  contribution_days: ContributionDay[]
}

export interface ContributionCalendar {
  colors: string[]
  is_halloween: boolean
  total_contributions: number
  weeks: ContributionWeek[]
}

export interface ActivityTimelineItem {
  month: string
  contribution_count: number
}

export interface GithubActivity {
  scope: string
  organization: string
  from: string
  to: string
  total_contributions: number
  total_commit_contributions: number
  total_issue_contributions: number
  total_pull_request_contributions: number
  total_pull_request_review_contributions: number
  contribution_calendar: ContributionCalendar
  timeline: ActivityTimelineItem[]
}

export interface GithubUser {
  login: string
  name: string
  bio: string
  company: string
  location: string
  blog: string
  twitter_username: string
  email: string
  html_url: string
  avatar_url: string
  type: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  organizations: GithubOrganization[]
  pinned_repositories?: GithubRepository[]
  repositories?: GithubRepository[]
  activity?: GithubActivity
}

export class UapiError extends Error {
  status: number
  code: string
  requestId: string

  constructor(status: number, code: string, message: string, requestId = '') {
    super(message)
    this.name = 'UapiError'
    this.status = status
    this.code = code
    this.requestId = requestId
  }
}
