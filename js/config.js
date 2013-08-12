CONFIG = {
  RESOURCE_PATH: '/resource',
};

CONFIG.FPS = 60;
// Every second, how many times of input processing will happen
CONFIG.INPUT_PER_SEC = 30;
// Each input can only afforded time, in mini seconds.
CONFIG.MS_PER_INPUT = 1000/CONFIG.INPUT_PER_SEC;

// Every second, how many times of update(game logic update, physic engine and graphics update) should occur
CONFIG.UPDATE_PER_SEC = 60;
// The time each update can only cost, in mini seconds.
CONFIG.MS_PER_UPDATE = 1000/CONFIG.UPDATE_PER_SEC;

// only 5 render call can omitted, if the update or input process is running to slow. After 5 times, the input or update loop will break in order to give renderer a chance to render the screen.
CONFIG.MAX_FRAMES_SKIP = 5;