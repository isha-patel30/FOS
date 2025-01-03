{
  /* {foodCategories
                  .filter((foodCategory, index) =>
                    foodItems.some(
                      item =>
                        item?.serverCategoryId ===
                        foodCategory?.serverCategoryId,
                    ),
                  )
                  .map((foodCategory, index) => {
                    const itemsInCategory = foodItems.filter(
                      item =>
                        item?.serverCategoryId ===
                        foodCategory?.serverCategoryId,
                    );

                    const totalQuantity = calculateTotalCategoryQuantity(
                      foodCategory?.serverCategoryId,
                    );

                    return (
                      <View
                        style={styles.tableBody()}
                        key={
                          foodCategory?.serverCategoryId + index?.toString()
                        }>
                        <View style={styles.subHeader()}>
                          <Text style={styles.categoryText()}>
                            {foodCategory?.categoryName}
                          </Text>
                          <Text style={styles.categoryItemCount()}>
                            {totalQuantity}
                          </Text>
                        </View>
                        {itemsInCategory.map((item, index) => {
                          const foodUnit = foodQuantityUnits.filter(
                            (unit, index) =>
                              unit?.serverQuantityUnitId ==
                              item?.serverQuantityUnitId,
                          );
                          return (
                            <View
                              style={styles.listItem()}
                              key={item?.serverItemId + index?.toString()}>
                              <View style={styles.itemsViewBody()}>
                                <TouchableOpacity
                                  style={styles.checkBoxView()}
                                  onPress={() =>
                                    toggleCheckbox(
                                      item?.serverItemId,
                                      item?.serverCategoryId,
                                    )
                                  }>
                                  {checkedItems.has(item?.serverItemId) ? (
                                    <IcCheckBoxActive />
                                  ) : (
                                    <IcCheckBoxInactive />
                                  )}
                                </TouchableOpacity>
                                <View style={styles.itemDetails()}>
                                  <Text style={styles.foodItem()}>
                                    {item?.itemName}
                                  </Text>
                                  <Text style={styles.foodDetailItem()}>
                                    {checkedItems.has(item?.serverItemId) &&
                                    foodItemQuantities[item?.serverItemId] > 0
                                      ? `${
                                          foodItemQuantities[item?.serverItemId]
                                        } portion(s) of ${item?.itemName} is ${
                                          foodItemQuantities[
                                            item?.serverItemId
                                          ] * item?.portionQuantity
                                        } ${foodUnit[0]?.unitName}`
                                      : null}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.portionViewBody()}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleDecrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcMinus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityTextView()}>
                                  <Text style={styles.quantityText()}>
                                    {foodItemQuantities[item?.serverItemId] ||
                                      0}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={styles.iconview()}
                                  onPress={() =>
                                    handleIncrementFoodItem(item?.serverItemId)
                                  }>
                                  <IcPlus
                                    width={size.moderateScale(15)}
                                    height={size.moderateScale(15)}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })} */
}
