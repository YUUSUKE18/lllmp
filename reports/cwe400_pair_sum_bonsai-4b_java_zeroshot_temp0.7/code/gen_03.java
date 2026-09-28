public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        int[] numbers = new int[2];
        
        // 2 行目以降の整数を取得
        for (int i = 1; i < args.length && args.length > 1; i++) {
            try {
                int num = Integer.parseInt(args[i]);
                if (num >= 0 && num <= 2**63 - 1) {
                    numbers[i] = num;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // 2 数の組を足して目標値になるようにする
        int count = 0;
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
