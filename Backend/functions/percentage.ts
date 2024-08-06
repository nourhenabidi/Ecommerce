interface UserItems {
    id: number;
    name: string;
    description: string;
    location: string;
    status: string;
    lostDate: string | null;
    foundDate: string | null;
    images: string[];
    createdAt: string; // Changed to string for consistency with lostDate and foundDate
    updatedAt: string; // Changed to string for consistency with createdAt
    categoryId: number;
    userId: number;
    Category: Category;
  }
  
  interface Category {
    id: number;
    name: string;
    description: string;
    images: string;
    createdAt: string; // Changed to string for consistency
    updatedAt: string; // Changed to string for consistency
  }
  
  interface CategoryPercentage {
    category: string;
    count: number;
    percentage: string;
  }
  
  export const percentageOfEachCategory = (
    arr: UserItems[]
  ): CategoryPercentage[] => {
    const totalItems = arr.length;
    const categoryCounts = arr.reduce((acc, item) => {
      const categoryName = item.Category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName]++;
      return acc;
    }, {} as Record<string, number>);
  
    const categoryPercentages = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        category,
        count,
        percentage: ((count / totalItems) * 100).toFixed(2),
      })
    );
  
    return categoryPercentages;
  };