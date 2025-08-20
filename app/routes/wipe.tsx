import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  return (
    <div className="flex flex-col justify-center items-center text-2xl m-8">
      {error && (
        <div className="w-[25%] h-[25%]">
          <div>Error {error}</div>
        </div>
      )}

      {isLoading && (
        <div className="w-[25%] h-[25%]">
          <img src="/images/resume-scan-2.gif" alt="scan" />
        </div>
      )}
      {!isLoading && !error && (
        <div>
          Authenticated as: {auth.user?.username}
          <div>Existing files:</div>
          <div className="flex flex-col gap-4">
            {files.map((file) => (
              <div key={file.id} className="flex flex-row gap-4">
                <p>{file.name}</p>
              </div>
            ))}

            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer m-8"
                onClick={() => handleDelete()}
              >
                Wipe App Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WipeApp;
