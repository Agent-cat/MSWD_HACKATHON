export const useStorage = () => {
  const saveToLocalStorage = (elements) => {
    try {
      const serializedData = JSON.stringify(elements);
      localStorage.setItem("canvas_elements", serializedData);
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const serializedData = localStorage.getItem("canvas_elements");
      return serializedData ? JSON.parse(serializedData) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
  };
};
