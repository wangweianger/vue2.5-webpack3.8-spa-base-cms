function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

// 更新列表展示
export const alertSomeThing = makeAction('ALERT_SOMETHING');


