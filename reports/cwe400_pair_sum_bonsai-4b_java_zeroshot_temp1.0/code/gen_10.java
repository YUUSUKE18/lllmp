public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        List<Integer> numbers = new ArrayList<>();
        
        for (int i = 1; i < args.length; i++) {
            try {
                numbers.add(Integer.parseInt(args[i]));
            } catch (NumberFormatException e) {
                // 空行または不正な整数は無視
                continue;
            }
        }
        
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
