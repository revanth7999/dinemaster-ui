const RestaurantCardSkeleton = () => {
  return (
    <div
      style={{
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginTop: "10px",
        backgroundColor: "white",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Image skeleton */}
        <div
          className="skeleton"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "10px",
            flexShrink: 0,
          }}
        />

        {/* Content skeleton */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* Title */}
          <div
            className="skeleton"
            style={{
              height: "16px",
              width: "70%",
              borderRadius: "4px",
            }}
          />
          {/* Cuisine */}
          <div
            className="skeleton"
            style={{
              height: "14px",
              width: "50%",
              borderRadius: "4px",
            }}
          />
          {/* Badge */}
          <div
            className="skeleton"
            style={{
              height: "28px",
              width: "80px",
              borderRadius: "999px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;
