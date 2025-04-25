const updateMenuItem = (
  index: number,
  field: "title" | "description",
  value: string
) => {
  setPost((prev) => ({
    ...prev,
    menuItems: prev.menuItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ),
  }));

  // Validate menu items after update
  const updatedMenuItems = post.menuItems.map((item, i) =>
    i === index ? { ...item, [field]: value } : item
  );
};
export const updateMenuItem;
