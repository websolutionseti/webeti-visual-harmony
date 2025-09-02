export interface Briefing {
  id: string;
  title: string;
  description: string;
  client: string;
  project_type: 'website' | 'app' | 'ecommerce' | 'branding' | 'marketing';
  status: 'draft' | 'review' | 'approved' | 'completed';
  created_at: string;
  updated_at: string;
  created_by: string;
  requirements: BriefingRequirement[];
  timeline?: {
    start_date?: string;
    end_date?: string;
    milestones?: Milestone[];
  };
}

export interface BriefingRequirement {
  id: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

export interface BriefingTemplate {
  id: string;
  name: string;
  description: string;
  project_type: Briefing['project_type'];
  requirements: Omit<BriefingRequirement, 'id' | 'completed'>[];
}

export interface ModuleConfig {
  authContext?: any;
  supabaseClient?: any;
  apiEndpoint?: string;
  theme?: 'light' | 'dark' | 'system';
}

export type BriefingFormData = {
  title: string;
  description: string;
  client: string;
  project_type: 'website' | 'app' | 'ecommerce' | 'branding' | 'marketing';
  status: 'draft' | 'review' | 'approved' | 'completed';
  requirements: BriefingRequirement[];
};