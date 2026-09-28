public class Main {
    public static void main(String[] args) {
        int goal = Integer.parseInt(args[0]);
        int[] nums = new int[1];
        int pairs = 0;

        // 空行や非整数の行は無視
        if (args.length > 1) {
            for (int i = 1; i < args.length; i++) {
                try {
                    nums[i] = Integer.parseInt(args[i]);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        // 2 行目以降の数字を処理
        for (int i = 0; i < nums.length; i++) {
            if (i < nums.length - 1) {
                int a = nums[i];
                int b = nums[i + 1];
                if (a + b == goal) {
                    pairs++;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
