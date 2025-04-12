import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/theme';
import { AccentColor, ThemeColor } from '../../configs/app';

const Settings = () => {
  const { themeColor, handleTheme, accentColor, handleAccent } = useTheme();
  return (
    <>
      <div
        className={`flex flex-col h-full border border-border-primary rounded-2xl py-4 px-5`}
      >
        <div className="flex items-center justify-start border-b border-border-primary pb-4 mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        </div>

        {/* Theme Settings Section */}

        <div className="flex-1 overflow-y-auto transition-all duration-300">
          <div className="rounded-xl border border-stroke bg-background-primary shadow-default border-border-primary ">
            <div className="border-b border-stroke py-6 px-7 text-text-primary flex justify-start items-center gap-3 border-border-primary">
              <PaintBrushIcon className="w-6 h-6" />
              <h3 className="text-base font-semibold ">Appearance</h3>
            </div>
            <div className="p-7 w-full">
              <div className="flex flex-col gap-4 w-full">
                {/* Theme Settings - Select Theme */}
                <div className="flex justify-start items-center border-b border-border-primary pb-4 mb-4">
                  <div className="w-1/4">
                    <p className=" text-text-primary font-medium mb-2">
                      Select Theme
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-start items-center gap-4 ">
                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        themeColor === ThemeColor.LIGHT &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleTheme(ThemeColor.LIGHT)}
                    >
                      <span className="w-16  h-12 bg-slate-100 mb-2 rounded-lg border border-border-primary"></span>
                      <span className="text-sm text-text-secondary ">
                        Light
                      </span>
                    </button>
                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        themeColor === ThemeColor.DARK &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleTheme(ThemeColor.DARK)}
                    >
                      <span className="w-16  h-12 border border-border-primary bg-gray-900 mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">Dark</span>
                    </button>
                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        themeColor === ThemeColor.SYSTEM &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleTheme(ThemeColor.SYSTEM)}
                    >
                      <span
                        className="w-16 h-12 border border-border-primary mb-2 rounded-lg"
                        style={{
                          background:
                            'linear-gradient(to right, #f1f5f9 50%, #111827 50%)',
                        }}
                      ></span>
                      <span className="text-sm text-text-secondary ">
                        Default
                      </span>
                    </button>
                  </div>
                </div>
                {/* Theme Settings - Select accent color */}
                <div className="flex justify-start items-center  border-border-primary pb-4 ">
                  <div className="w-1/4">
                    <p className=" text-text-primary font-medium mb-2">
                      Select Accent Color
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-start items-center gap-4 ">
                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        accentColor === AccentColor.BLUE &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleAccent(AccentColor.BLUE)}
                    >
                      <span className="w-16  h-12 bg-[#3b82f6] mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">Blue</span>
                    </button>

                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        accentColor === AccentColor.GREEN &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleAccent(AccentColor.GREEN)}
                    >
                      <span className="w-16  h-12 bg-[#10b981] mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">
                        Green
                      </span>
                    </button>

                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        accentColor === AccentColor.YELLOW &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleAccent(AccentColor.YELLOW)}
                    >
                      <span className="w-16  h-12 bg-[#f59e0b] mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">
                        Yellow
                      </span>
                    </button>

                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        accentColor === AccentColor.RED &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleAccent(AccentColor.RED)}
                    >
                      <span className="w-16  h-12 bg-[#ef4444] mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">Red</span>
                    </button>

                    <button
                      className={`flex flex-col justify-center items-center hover:bg-background-secondary-hover p-3 rounded-xl transition-all ${
                        accentColor === AccentColor.PURPLE &&
                        'bg-background-secondary-hover'
                      }`}
                      onClick={() => handleAccent(AccentColor.PURPLE)}
                    >
                      <span className="w-16  h-12 bg-[#8b5cf6] mb-2 rounded-lg"></span>
                      <span className="text-sm text-text-secondary ">
                        Purple
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
