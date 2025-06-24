import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff, Key, Save, Trash2 } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

const GeminiKeyManager = () => {
  const { user, updateGeminiKey, deleteGeminiKey } = useAuth();
  const { addToast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateKey = async () => {
    if (!apiKey.trim()) {
      addToast({ message: "Please enter a valid API key", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await updateGeminiKey(apiKey);
      addToast({ message: "Gemini API key updated successfully!", type: "success" });
      setApiKey("");
    } catch (error) {
      addToast({
        message: error instanceof Error ? error.message : "Failed to update API key",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!confirm("Are you sure you want to delete your Gemini API key? This will disable AI features.")) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteGeminiKey();
      addToast({ message: "Gemini API key deleted successfully", type: "success" });
    } catch (error) {
      addToast({
        message: error instanceof Error ? error.message : "Failed to delete API key",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Gemini API Key
        </CardTitle>
        <CardDescription>
          Configure your Google Gemini API key to enable AI-powered features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Status:
          </span>
          <Badge variant={user?.has_gemini_key ? "default" : "outline"}>
            {user?.has_gemini_key ? "Configured" : "Not Configured"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {user?.has_gemini_key ? "Update API Key" : "Enter API Key"}
            </label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleUpdateKey}
              disabled={isLoading || !apiKey.trim()}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              {user?.has_gemini_key ? "Update Key" : "Save Key"}
            </Button>
            
            {user?.has_gemini_key && (
              <Button
                variant="destructive"
                onClick={handleDeleteKey}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Key
              </Button>
            )}
          </div>
        </div>

        {!user?.has_gemini_key && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> You need to configure your Gemini API key to use AI-powered features like goal generation and suggestions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeminiKeyManager;
