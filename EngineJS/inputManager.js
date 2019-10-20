class InputManager {
    static init(){
        document.addEventListener("keydown", InputManager.keyDownHandler, false);
        document.addEventListener("keyup", InputManager.keyUpHandler, false);
        InputManager.inputs = new Map();
    }
    static keyDownHandler(event)
    {
        InputManager.inputs.set(event.key.toString(), new Key(true));
    }
    static keyUpHandler(event)
    {
        InputManager.inputs.set(event.key, new Key(false));
    }
    static get(key)
    {
        if (!InputManager.inputs.has(key))
        {
            return new Key(false);
        }
        return InputManager.inputs.get(key);
    }
}