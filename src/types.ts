export type Category = 
  | 'All'
  | 'Travel'
  | 'Food'
  | 'Places'
  | 'City Life'
  | 'Lifestyle'
  | 'Experiences'
  | 'Culture';

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface PracticalInfo {
  bestTimeToVisit?: string;
  idealBudget?: string;
  localTip: string;
  howToReach?: string;
  recommendedFor?: string;
}

export interface ArticleSection {
  heading?: string;
  subHeading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  quote?: string;
  callout?: {
    title: string;
    content: string;
  };
}

export interface AEOFaqItem {
  question: string;
  directAnswer: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: Category;
  heroImage: string;
  imageAlt: string;
  shortIntro: string;
  readingTime: string;
  publishedDate: string;
  author: Author;
  isFeatured?: boolean;
  sections: ArticleSection[];
  practicalInfo?: PracticalInfo;
  keyTakeaways: string[];
  relatedArticleSlugs: string[];
  tags: string[];
  // SEO & AEO Enhancements
  seoTitle?: string;
  metaDescription?: string;
  mainKeyword?: string;
  relatedKeywords?: [string, string];
  isAEOOptimized?: boolean;
  aeoFaq?: AEOFaqItem[];
}
