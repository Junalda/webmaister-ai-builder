export type Plan = 'free' | 'starter' | 'pro' | 'agency';
export type ProjectStatus = 'draft' | 'generating' | 'ready' | 'published';
export type DFYStatus = 'pending' | 'in_review' | 'accepted' | 'in_progress' | 'delivered' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  credits: number;
  isAdmin?: boolean;
  createdAt: string;
}

export interface PageSection {
  id: string;
  type: 'features' | 'testimonials' | 'cta' | 'text' | 'gallery' | 'faq';
  heading?: string;
  content?: string;
}

export interface PageContent {
  headline?: string;
  subheadline?: string;
  body?: string;
  ctaText?: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: PageSection[];
}

export interface WebsitePage {
  id: string;
  projectId: string;
  slug: string;
  title: string;
  order: number;
  content: PageContent;
}

export interface ProjectIntake {
  businessName: string;
  industry: string;
  targetAudience: string;
  mainService: string;
  location: string;
  desiredPages: string[];
  brandTone: string;
  brandColors: string[];
  websiteGoal: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  status: ProjectStatus;
  intake: ProjectIntake;
  pages: WebsitePage[];
  createdAt: string;
  updatedAt: string;
}

export interface DoneForYouRequest {
  id: string;
  userId: string;
  name: string;
  email: string;
  businessName: string;
  description: string;
  budget: string;
  timeline: string;
  status: DFYStatus;
  createdAt: string;
  notes?: string;
}

export interface PricingTier {
  id: Plan;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  credits: number;
  highlighted?: boolean;
  cta: string;
}

export interface AIGeneration {
  id: string;
  projectId: string;
  userId: string;
  creditsUsed: number;
  prompt: string;
  createdAt: string;
}
