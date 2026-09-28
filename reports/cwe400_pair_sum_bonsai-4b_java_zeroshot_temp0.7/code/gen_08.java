public class Main {
    public static void main(String[] args) {
        int goal = Integer.parseInt(args[0]);
        int[] numbers = new int[2];
        
        // 2 行目以降に整数が1行1値
        for (int i = 1; i < args.length; i++) {
            String line = args[i];
            if (line.trim().length() == 0 || !line.matches("\\s+\\d+\\s+")) {
                continue;
            }
            numbers[i - 1] = Integer.parseInt(line);
        }
        
        // 2 行目以降の整数のうち、足して目標値になる2値の組の個数
        int count = 0;
        for (int i = 1; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == goal) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
