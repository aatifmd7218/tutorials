export const fetchTutorialStatus = async (topicslug) => {
  const response = await fetch(
    "https://tutorial-app-phi.vercel.app/api/combinedapi",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiName: "gettutorialstatus",
        topicslug,
      }),
    }
  );
  const { error, result } = await response.json();
  if (error) {
    console.error("Tutorial Status Get error:", error);
    throw new Error("Tutorial Status fetch failed");
  }
  return {
    tutorialStatus: result,
  };
};
