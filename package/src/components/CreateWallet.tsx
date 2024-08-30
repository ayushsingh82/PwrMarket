import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";

const GRADIENT_BORDER_WIDTH = 2;

const buttonStyles = {
  background: "transparent",
  border: "1px solid transparent",
  boxSizing: "border-box",
};

const contentWrapperStyle = {
  position: "relative",
};

function Gradient({
  children,
  style,
  isAnimationDisabled,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  isAnimationDisabled: boolean;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating, setIsAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div
      style={contentWrapperStyle as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
    >
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

const sdk = new CoinbaseWalletSDK({
  appName: "Adbase",
  appLogoUrl: "https://example.com/logo.png",
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

export function BlackCreateWalletButton({
  height = 66,
  width = 200,
  handleSuccess,
  handleError,
}: {
  height: number,
  width: number,
  handleSuccess: (address: any) => void,
  handleError: (error: any) => void
}) {
  const minButtonHeight = 48;
  const minButtonWidth = 200;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: "border-box",
        overflow: "hidden",
      },
      gradient: {
        background:
          "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
        position: "absolute",
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      },
      buttonBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: "#000000",
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        borderRadius: buttonHeight / 2,
        position: "relative",
        paddingRight: 10,
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter]
  );

  const createWallet = useCallback(async () => {
    try {
      const [address]: string[] = await provider.request({
        method: "eth_requestAccounts",
      });
      handleSuccess(address);
    } catch (error) {
      handleError(error);
    }
  }, [handleSuccess, handleError]);

  return (
    <button style={buttonStyles as React.CSSProperties} onClick={createWallet}>
      <div style={styles.gradientContainer as React.CSSProperties}>
        <Gradient
          style={styles.gradient as React.CSSProperties}
          isAnimationDisabled={false}
        >
          <div style={styles.buttonBody as React.CSSProperties}>
            <CoinbaseWalletLogo containerStyles={{ paddingTop: 10 }} />
            Create Wallet
          </div>
        </Gradient>
      </div>
    </button>
  );
}
