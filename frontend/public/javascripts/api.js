const URL = 'http://localhost:4444'
class ApiFunctions {
  async registration(values) {
    if (this.validator(values)) {
      const response = await fetch(`${URL}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      return response.json();
    }
  }
  async login(values) {
    if (this.validator(values)) {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      return response.json();
    }
  }
  validator(values) {
    for (const key in values) {
      if (!values[key]) {
        console.log({
          status: "error",
          message: "write all inputs"
        });
        return;
      }
    }
    return true;
  }
}

export default new ApiFunctions();