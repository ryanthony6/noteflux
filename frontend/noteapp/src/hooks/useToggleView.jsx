import { useState, useEffect } from "react";

function useToggleView() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isShowingAddEdit, setIsShowingAddEdit] = useState(false);

  // Detect screen size to check if it's mobile
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 768);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Toggle function to show Add/Edit on mobile
  const toggleAddEditView = () => {
    if (isMobileView) setIsShowingAddEdit((prev) => !prev);
  };

  // Close function to reset the view
  const closeAddEditView = () => setIsShowingAddEdit(false);

  return {
    isMobileView,
    isShowingAddEdit,
    toggleAddEditView,
    closeAddEditView,
  };
}

export default useToggleView;
